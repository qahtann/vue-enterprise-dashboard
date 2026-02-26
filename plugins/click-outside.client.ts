export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el: HTMLElement, binding: any) {
      el.clickOutsideEvent = (event: MouseEvent) => {
        if (!(el === event.target || el.contains(event.target as Node))) {
          binding.value(event)
        }
      }
      document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el: HTMLElement) {
      document.removeEventListener('click', el.clickOutsideEvent)
    },
  })
})

declare module '@vue/runtime-core' {
  interface HTMLElement {
    clickOutsideEvent?: (event: MouseEvent) => void
  }
}
