Fall Guys
=========

[Fall Guys @ Sangu](https://sangu.be/fallguys)

## Interesting Links

- [Famdom - Obstacles](https://fallguysultimateknockout.fandom.com/wiki/Obstacles)
- [Liquid Cheat Sheet](https://cloudcannon.com/community/jekyll-cheat-sheet/)

## Ideas

- Some default stuff:
    - Turn on names R2 -> All tail games
    - Need to check the flyby to know some stuff (Wall Guys, Dizzy Heights, Pipe Dream, Fall Mountain)
- free text search in all headers to quickly go to a page? (could do the search like in blog)
- fix main page layout on small devices. on small devices the level-detail back button isn't showing (float: right?).
- levels: add buttons to show only races/survival + select season(s) filters
- "Abandoned" shortcuts: no longer viable since update xyz (am using obsolete: true already somewhere)
- Need to be able to fold certain sections (ex: max 4 shown, other need a click to open)
- Fall Guys TV: "Hide This" button


## Deploy

```ps1
$env:JEKYLL_ENV = "production";
bundle exec jekyll build;
$env:JEKYLL_ENV = "development";
```

And upload with ftp client.


## TODO

- Crown Level Rewards 30-50 : SEeLLPy_zCQ

Shortcuts need to be retired: Obsolete or Retired?
Difficulty of a shortcut --> Badge + Filters

Hide certain stuff by default
- Like all "other stuff" links after 2 vids?
- Hide more stuff by defaul on mobile
