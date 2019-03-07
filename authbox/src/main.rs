extern crate hyper;
use hyper::{Body, Request, Response, Server};
use hyper::rt::Future;
use hyper::{Method, StatusCode};
use hyper::service::service_fn;
use hyper::Chunk;

extern crate futures;
use futures::future;
use futures::Stream;



fn main() {
    let addr = ([127, 0, 0, 1], 3000).into();

    let server = Server::bind(&addr)
    .serve(|| service_fn(echo))
    .map_err(|e| eprintln!("server error: {}", e));

    hyper::rt::run(server);
}

type BoxFut = Box<Future<Item=Response<Body>, Error=hyper::Error> + Send>;

fn echo(req: Request<Body>) -> BoxFut {
    let mut response = Response::new(Body::empty());
    let mut builder = Response::builder();

    match (req.method(), req.uri().path()) {
        (&Method::GET, "/app") => {
            builder
                .header("Content-Type", "application/javascript")
                .status(StatusCode::OK);
            if req.headers().contains_key("beep") {
                builder.header("boop", "beep");
            }
            builder.body(spa()).unwrap();
        },
        (&Method::GET, "/") => {
            *response.body_mut() = Body::from("Try POSTing data to /echo");
        },
        (&Method::POST, "/echo/uppercase") => {
            // This is actually a new `futures::Stream`...
            let mapping = req
            .into_body()
            .map(|chunk| {
                chunk.iter()
                .map(|byte| byte.to_ascii_uppercase())
                .collect::<Vec<u8>>()
            });

            // Use `Body::wrap_stream` to convert it to a `Body`...
            *response.body_mut() = Body::wrap_stream(mapping);
        },
        (&Method::POST, "/echo/reverse") => {
            // This is actually a new `Future`, waiting on `concat`...
            let reversed = req
            .into_body()
            // A future of when we finally have the full body...
            .concat2()
            // `move` the `Response` into this future...
            .map(move |chunk| {
                let body = chunk.iter()
                .rev()
                .cloned()
                .collect::<Vec<u8>>();

                *response.body_mut() = Body::from(body);
                response
            });

            // We can't just return the `Response` from this match arm,
            // because we can't set the body until the `concat` future
            // completed...
            //
            // However, `reversed` is actually a `Future` that will return
            // a `Response`! So, let's return it immediately instead of
            // falling through to the default return of this function.
            return Box::new(reversed)
        },
        (&Method::POST, "/echo") => {
            *response.body_mut() = req.into_body();
        },
        _ => {
            *response.status_mut() = StatusCode::NOT_FOUND;
        },
    };

    Box::new(future::ok(response))
}

fn spa() -> String {

    "This was called".to_string()
}
