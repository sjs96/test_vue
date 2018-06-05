<template>
  <div >

    <section>
      <!-- left side start-->
      <menu-list ></menu-list>
      <!-- left side end-->

      <!-- main content start-->
      <div class="main-content" >

        <!-- header section start-->
        <header-section ></header-section>
        <!-- header section end-->
        <!--content section start-->
        <content-section></content-section>
        <!--content section start-->
        <!--footer section start-->
        <footer-section></footer-section>
        <!--footer section end-->
      </div>
      <!-- main content end-->
    </section>
  </div>
</template>
<script>
  import MenuList from '../../../components/section-menu.vue'
  import HeaderSection from '../../../components/section-header.vue'
  import FooterSection from '../../../components/section-footer.vue'
  import ContentSection from './content.vue'
  export default{
    components: {
      MenuList,
      HeaderSection,
      FooterSection,
      ContentSection
    }
  }
</script>
