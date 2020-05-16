# `@teddytags/router`

Efficient routing for TeddyTags.

# Note to developers

This is an ultra-simple implementation of a router so don't expect it to work like a pro. But it will suffice most of your needs anyways.

# Usage

```jsx
const routes = [
  {
    //path to match
    path: "/",
    //Title of the page
    title: "Home",
    //component to render
    render: () => <Home />,
  },
  {
    path: "404",
    title: "404",
    render: () => <fourOhFour />,
  },
  {
    //the :foo is a parameter sliced from url
    path: "products/:foo",
    title: "Products",
    //use it here
    render: (p) => <Product name={p.foo} />,
  },
  {
    //the :endOfPath is a special parameter that matches till end of URL
    path: "blog/:endOfPath",
    title: "Blog",
    //use it here
    render: async (p) => {
      const fetcher = await fetch(`myblog.site/${p.endOfPath}.md`);
      const blogMD = await fetcher.text();
      return <Blog content={blogMD} />;
    },
  },
];
```
