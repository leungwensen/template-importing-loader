# template-importing-loader
====================

webpack loader, adding `<import>` syntax for javascript templates (underscore template engine, etc)

## usage

```shell
npm install template-importing-loader --save-dev
```

it's better used with `template2module-loader`

```javascript
{
  module: {
    loaders: [
      {
        test: /\.tpl$/,
        loader: 'template2module-loader',
        query: {
          engine: 'underscore',
          format: 'commonjs',
          outerScopeVars: [
            'translate',
            '_',
          ],
          preOuterScope: [
            'var translate = require("zero-text/i18n").translate;',
            'var _ = require("underscore");',
          ].join('\n'),
        }
      }
    ],

    // resolving template importing before transform files to `template2module-loader`
    preLoaders: [
      {
        test: /\.tpl$/,
        loader: 'template-importing-loader'
      }
    ]
  }
}
```

template files

```shell
src
   |--greeting.tpl
   |--comman.tpl
```

`src/greeting.tpl`

```html
I am <%=name%><%if(man){%> and I like playing <%=man.game%><%}%>.
My favorite animates are
<% _.each(animates, function(animate){ %>
   <% if (animate.type !== invisibleType ){ %>
       <%=animate.name%>
   <% } %>
<% }); %>
etc.

<import src="./common.tpl"></import>
```

`src/common.tpl`

```html
hello, template importing.
```

when `src/greeting.tpl` is passed to other loaders, it's content is like:

```html
I am <%=name%><%if(man){%> and I like playing <%=man.game%><%}%>.
My favorite animates are
<% _.each(animates, function(animate){ %>
   <% if (animate.type !== invisibleType ){ %>
       <%=animate.name%>
   <% } %>
<% }); %>
etc.

hello, template importing.
```

