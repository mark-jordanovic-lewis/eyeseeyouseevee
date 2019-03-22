# mock_server

### Intention
This will hopefully end up as an app to introspect the box, along with the error pages in `routes`.
Using sinatra to listen for connections while building some nginx functionality and watir to introspect routes as they are built or erroring out.
The error/xxx.html pages and the JS associated with it will be incorporated into this app to provide app introspection to the admin.

### But for now
This is just an app to send http requests to when nginx is listening on an endpoint that needs configuring or debugging.
