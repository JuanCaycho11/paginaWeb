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
              LA MEJOR CALIDAD AL PRECIO JUSTO
            </h1>
            <span> Más seguridad para toda tu familia </span>
          </v-layout>
        </v-flex>
        <v-flex
          v-for="item in cards"
          :key="item.id"
          xs12
          sm12
          md4
          px-8
          pt-6
        >
          <v-card hover>
            <v-img :aspect-ratio="16/9" :src="item.img" />
            <v-card-title>
              <div>
                <h3>{{ item.titulo }}</h3>
                <p>{{ item.descripcion }}</p>
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
        { src: 'https://www.noticias.costosperu.com/wp-content/uploads/2019/04/GAS.jpeg' },
        { src: 'https://www.aboutespanol.com/thmb/1vu9KPtXEmoqK-cs93Dk1PMQWgE=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/familiacocinandojuntos-5b3ea3f046e0fb005b947bde.jpg' },
        { src: 'https://images.clarin.com/2019/04/23/gurgR2Asa_1256x620__1.jpg' },
        { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg' }
      ],
      cards: [
        { img: 'https://www.perualdia.pe/wp-content/uploads/2018/07/Noticia-78065-gas.jpg', titulo: 'Servicios Sursa Gas', descripcion: 'Reparto a domicilio, venta de reguladores, asistencia técnica, instalación de redes GLP.' },
        { img: 'https://pic.truckscout24.net/images-big/09/81/0018728109001.jpg', titulo: 'titulo #1', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. am repellendus? Similique, dolorum nulla. Natus reiciendis perspiciatis cum consequuntur?' },
        { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Bw_evjLSaZquEBBVqw6Q7-mBstXp4T603a5--RpfndDJ-mPW', titulo: 'titulo #1', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. am repellendus? Similique, dolorum nulla. Natus reiciendis perspiciatis cum consequuntur?' }
      ]
    }
  }
}
</script>

<style scoped>
p {
  font-size: 14px
}
</style>
