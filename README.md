Fall Guys
=========

## Interesting Links

- [Famdom - Obstacles](https://fallguysultimateknockout.fandom.com/wiki/Obstacles)
- [Liquid Cheat Sheet](https://cloudcannon.com/community/jekyll-cheat-sheet/)

## Levels not done

- Lost Temple
- Pipe Dream


## Ideas

- Remove .html from all links
- Some default stuff:
    - Turn on names R2 -> All tail games
    - Need to check the flyby to know some stuff (Wall Guys, Dizzy Heights, Pipe Dream, Fall Mountain)
- free text search in all headers to quickly go to a page? (could do the search like in blog)
- fix layout on small devices
- levels: add buttons to show only races/survival + select season(s) filters
- "Abandoned" shortcuts: no longer viable since update xyz


## Deploy

```ps1
$env:JEKYLL_ENV = "production";
bundle exec jekyll build;
```

And upload with ftp client.
