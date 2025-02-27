import { createServer, Model, Factory, trait } from "miragejs";
import { add, parseISO } from "date-fns";
import faker, { image, name, internet, lorem } from "faker";

faker.seed(123);

let startingDate = parseISO("2020-01-14");
let server = createServer({
  timing: 1000,
  models: {
    tweet: Model,
  },

  factories: {
    tweet: Factory.extend({
      name() {
        return name.findName();
      },

      username() {
        return internet.userName();
      },

      text() {
        return lorem.sentence();
      },

      avatarUrl() {
        return image.avatar();
      },

      date(i) {
        return add(startingDate, { days: i }).toISOString();
      },

      fromLuigi: trait({
        name: "Luigi Cruz",
        username: "luigircruz",
        avatarUrl:
          "https://gravatar.com/avatar/fa95cee551ddd0186ccdecae4721a891?s=400&d=robohash&r=x",
      }),
    }),
  },

  routes() {
    this.namespace = "api";
    this.get("tweets");

    this.passthrough();
  },

  seeds(server) {
    server.create("tweet", "fromLuigi", { text: "just setting up my twttr" });
    server.create("tweet", "fromLuigi", { text: "Hi" });
    server.create("tweet", "fromLuigi", {
      text: "I still don't understand useEffect",
    });
  },
});

setInterval(() => {
  server.create("tweet");
}, 3000);
