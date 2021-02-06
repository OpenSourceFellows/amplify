<template>
    <div class="home">
        <home-hero></home-hero>
        <home-details></home-details>
    </div>
</template>

<script>
// @ is an alias to /src
import HomeHero from '@/components/HomeHero.vue';
import HomeDetails from '@/components/HomeDetails';

export default {
    name: 'Home',
    components: {
        HomeHero,
        HomeDetails
    }
};
</script>
