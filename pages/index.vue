<template>
  <div>
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in img"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      />
    </v-carousel>

    <v-container grid list-md>
      <v-layout justify-center align-center row wrap>
        <v-flex md12 xs12 sm12>
          <v-layout align-center justify-center column fill-height>
            <h1 class="grey--text">
              El futuro esta en nuestras manos
            </h1>
            <span> x años brindando la mejor educación</span>
          </v-layout>
        </v-flex>
        <v-flex
          v-for="item in cards"
          :key="item.id"
          xs12
          sm12
          md4
          px-4
          pt-3
        >
          <v-card hover>
            <v-img :aspect-ratio="16/9" :src="item.img" />
            <v-card-title>
              <div>
                <h3>{{ item.titulo }}</h3>
                <span>{{ item.descripcion }}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn block color="blue" dark>
                Ver mas Informacion
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      img: [
        { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg' },
        { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg' },
        { src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg' },
        { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg' }
      ],
      cards: [
        { img: 'https://www.limagas.com/img/img-servlimagas.png', titulo: 'titulo #1', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. am repellendus? Similique, dolorum nulla. Natus reiciendis perspiciatis cum consequuntur?' },
        { img: 'https://www.paginasamarillas.com.pe/dbimages/2680641/11354.jpg', titulo: 'titulo #1', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. am repellendus? Similique, dolorum nulla. Natus reiciendis perspiciatis cum consequuntur?' },
        { img: 'https://elgasnoticias.com/wp-content/uploads/2017/12/Zeta-Gas.jpeg', titulo: 'titulo #1', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. am repellendus? Similique, dolorum nulla. Natus reiciendis perspiciatis cum consequuntur?' }
      ]
    }
  }
}
</script>

<style scoped>
span {
  font-size: 14px
}
</style>
