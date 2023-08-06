<script lang="ts">
  export let count: number;
  let color = "color: #60a5fa";
  let colorDarker = "color: #0284c7";
  const changeColor = (count: number) => {
    if (count < 3) {
      color = "color: #60a5fa";
      colorDarker = "color: #0284c7";
    } else if (count < 6) {
      color = "color: #22c55e";
      colorDarker = "color: #16a34a";
    } else if (count < 8) {
      color = "color: #f59e0b";
      colorDarker = "color: #ea580c";
    } else if (count < 10) {
      color = "color: #dc2626";
      colorDarker = "color: #b91c1c";
    } else {
      color = "color: #831843";
      colorDarker = "color: #500724";
    }
  };
  $: changeColor(count);
</script>

<div class="waves -z-50" style={`transform: scale(1, ${count / 10 + 0.2});`}>
  <div class="wave wave--back" style={colorDarker}>
    <div class="water">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 350 32"
        preserveAspectRatio="none"
        ><title>wave2</title><path
          d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z"
        /></svg
      >
    </div>
    <div class="water">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 350 32"
        preserveAspectRatio="none"
        ><title>wave2</title><path
          d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z"
        /></svg
      >
    </div>
  </div>
  <div class="wave wave--front" style={color}>
    <div class="water">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 350 32"
        preserveAspectRatio="none"
        ><title>wave2</title><path
          d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z"
        /></svg
      >
    </div>
    <div class="water">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 350 32"
        preserveAspectRatio="none"
        ><title>wave2</title><path
          d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z"
        /></svg
      >
    </div>
  </div>
</div>

<style lang="scss">
  $blue-dark: #1e384c;
  $blue: #2c7fbe;
  $blue-light: #32bafa;
  $green: #02c39a;

  .waves {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    transition: 0.4s transform ease;
    transform-origin: bottom center;

    @media (min-width: 500px) {
      border-radius: 5px;
    }
  }
  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: wave 1s linear infinite;
    transition: color 2s ease;

    &--front {
      z-index: 2;
      color: $blue-light;
    }

    &--back {
      z-index: 1;
      color: $blue;
      animation-direction: reverse;
    }
  }

  .water {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80%;
    background: currentColor;

    svg {
      position: absolute;
      width: 100%;
      left: 0;
      right: 0;
      bottom: 99.9%;
    }
  }
  .water:first-of-type {
    transform: translate(-100%, 0);
  }

  svg {
    fill: currentColor;
  }

  @keyframes wave {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(50%, 0.5em, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes pulseAway {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.4);
    }
  }
</style>
