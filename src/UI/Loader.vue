<!-- src/components/Loader/index.vue -->
 <script>
</script>

<template>
  <transition name="fade">
    <div class="loader items-center" >
      <div>
        <div class="spinner-container">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="text-container">
          <h2 class="heading-2">Loading...</h2>
          <p>Please wait while we load your data</p>
        </div>
      </div>
    </div>
  </transition>
</template>


<style scoped>
.spinner-container{
    display: flex;
    justify-content: center
}
  .text-container {
    max-width: 40rem;
    text-align: center
  }
  .loader {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: var(--color-pastel-white);
    display: grid;
    place-items: center;
    z-index: 30;
  }
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 9.2rem;
    height: 10rem;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 8rem;
    height: 8rem;
    margin: 8px;
    border: 4px solid var(--color-pastel-black);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--color-pastel-black) transparent transparent var(--color-pastel-white);
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>