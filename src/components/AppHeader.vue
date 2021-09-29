<template>
    <header>
        <img alt="Vue logo" src="../assets/logo.svg" height="50" />
        <p>Amplify</p>
        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/about">About</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'NavBar'
};
</script>
<style lang="less">
header {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 0.5rem 1rem;
    align-items: center;

    p {
        margin-left: 1rem;
    }
}

nav {
    margin-left: auto;

    ul {
        list-style: none;
    }

    ul li {
        display: inline-flex;
        margin-left: 1rem;
    }
}
</style>
