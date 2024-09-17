const app = Vue.createApp({
  data() {
    return {
      newTweet: "",
      tweets: [],
      showCompleted: true,
      postLink: "https://x.com/intent/post",
    };
  },
  computed: {
    filteredTweets() {
      return this.showCompleted
        ? this.tweets
        : this.tweets.filter((tweet) => !tweet.completed);
    },
    totalTweets() {
      return this.tweets.length;
    },
    completedTweets() {
      return this.tweets.filter((tweet) => tweet.completed).length;
    },
  },
  methods: {
    addTweet() {
      if (this.newTweet.trim()) {
        this.tweets.push({ text: this.newTweet, completed: false });
        this.newTweet = "";
      }
    },
    toggleComplete(index) {
      const text = this.tweets[index].text;
      const link = `${this.postLink}?text=${encodeURIComponent(text)}`;

      window.open(link, "_blank");
      this.tweets[index].completed = !this.tweets[index].completed;
    },
    removeTweet(index) {
      this.tweets.splice(index, 1);
    },
  },
  template: `
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 class="text-2xl font-bold mb-4 text-center">Gestor de Tweets</h1>

          <div v-if="tweets.length" class="mb-4">
              <p class="text-center">{{ completedTweets }} de {{ totalTweets }} tweets completados</p>
              <label class="flex justify-center items-center mt-2">
                  <input type="checkbox" v-model="showCompleted" class="mr-2">
                  <span>Mostrar completados</span>
              </label>
          </div>

          <form @submit.prevent="addTweet" class="mb-6">
              <div class="flex justify-center items-center">
                  <input 
                      v-model="newTweet" 
                      placeholder="Agregar nuevo tweet" 
                      class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <button type="submit" class="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Agregar
                  </button>
              </div>
          </form>

          <ul class="space-y-4">
              <li v-for="(tweet, index) in filteredTweets" :key="index" class="flex justify-between items-center p-3 border-b border-gray-200">
                  <span :class="{ 'line-through text-gray-400': tweet.completed }">{{ tweet.text }}</span>
                  <div class="flex space-x-3">
                      <button 
                          @click="toggleComplete(index)" 
                          class="text-xs px-2 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600"
                      >
                          {{ tweet.completed ? "Desmarcar" : "Completar" }}
                      </button>
                      <button 
                          @click="removeTweet(index)" 
                          class="text-xs px-2 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                      >
                          Eliminar
                      </button>
                  </div>
              </li>
          </ul>

          <p v-if="!tweets.length" class="text-center text-gray-500 mt-6">No tienes tweets aún.</p>
      </div>
  `,
});

app.mount("#app");
