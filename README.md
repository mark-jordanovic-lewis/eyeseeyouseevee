# This is supposed to be my CV
- It _will_ eventually be my cv but it's also a playground for building my own tools.
- I've chosen my favourite set of languages and basic tools and I'm trying to get to expert
  level in all of it. This may take me some time, but you should be able to find technology
  such as:
  - Rust (why not Golang you ask? Well, I really dislike runtime errors. I will throw some Go on
    here too through.)
  - Nginx (engineX or n-jinx? - it's up to you just don't pronounce it like the company wants you
    to... yuk! http://www.pronouncekiwi.com/NGINX,%20Inc)
  - Docker (no not any of the other tools, just plain docker... for now)
  - Ruby (I will likely use rails at some point but see the philosophy section below)
  - Elixir (because why would you not include an inherently async telecoms language in a box
    destined for living on the net? Also, as pretty as Ruby and functional)
  - Angular2+ (because it seems like all the lessons from angular one and react were learnt and,
    honestly, type safe javascript is great and the Angular team seemed to copy Elms runtime
    philosophy which is AWESOME)
  - Postgres (look, nosql is trendy n all that, and graphql - yeah I get it, but postgres will
    never die. It's too good at what it does.)
- I'm calling this the RnD_REAP stack because I was lucky with my choices to get a cool acronym
  and it says what I am trying to do. Research and Development and reap the rewards. LDAP will
  also be used on here as I want the LMDB speed for authBox to reduce latency in redirecting to
  the internal tools but it didn't fit the acronym.
- System diagram will come but I'm not 100% on what it should look like yet.

### Philosophy and Design Ideas
- I want a set of small dedicated programs that serve:
  - A SPA
  - Single point of access for authentication in low level, multithreaded program handling all  
    incoming connections reverse proxied through nginx to the apps the request is actually for, then
    back out through the authentication app to have the headers re-applied
  - Heavy calculation task API (targetting some low level language or numpy) will be offloaded
    in the future
  - Chat and other async data API (Elixir ... so shiney)
  - Representation of business logic for admin (let's face it, it's going to be in Rails) for
    accessing the box externally
  - Simple way of throwing DB together and tearing them down - no I will not be using activerecord
    as every app will probably access the DB (which is going to create some fun problems), I will be exclusively using postgres and _everything_ will be defined in yaml, and, I don't want to start my world with `rails new` (it's going to be `reap new` eventually I hope).
  - All the otehr cool things that happen after these thigns are built which I havn't planned yet.
- Frameworks and packages usually contain a lot more cruft than useful code (unless you are basing
  your app completely around their functionality)
- Smaller code means a smaller memory footprint and, unless you are a clever low level programmer
  implementing some arcane threadiness, faster runtime.
- Writing your own tools gives you an environment that you know well and could even be helpful for
  other people trying to do similar things.
- Microservices are envisaged as a single app, usually built on a framework, running in some docker
  container. I think that groups of related or even just 'small enough' microservices should be
  bundled into one container to run on a slightly larger container.

### Disclaimer
- This is a work in progress, it's never actually going to be finished and when I get to the point
  that the cv app part of it works I'm likely going to break it out into a minimal set of tools and
  apps and repackage it as RnD_REAP v0.1
- I don't expect anyone to want to work on this stack so the style, testing, etc is going to be
  mishmash. When I'm at work I am a TDD zealot but in my own projects my flow is like this:
  - Get an idea of what I want to do
  - Throw code at the machine till I have something that looks like a solid base.
  - Write a few simple functionality tests and refactor so it's not such a mess.
  - Now the code looks like an MVP, I write tests for anything new but if an idea strikes, it's
    back to step one.
  - loop...
- Feel free to use this but don't expect:
  - Any support (unless you are friendly and fun)
  - This to be somekind of complete product with generators (I will make some generators)

### Contributing
- If you want to contribute, why? It's a personal project for practicing code, any help would
  render it pretty pointless.
- If you have ideas about what I should build bang them in the issues and I'll see if I can get to  
  them.
