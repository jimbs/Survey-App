import { ref, inject, computed, onUpdated, toRefs, defineComponent } from 'vue'
import { useOptionStore } from '../../stores/options'

export default defineComponent({
  name: 'OptionModal',
  props: {
    show: Boolean,
    onHide: Function,
    onAction: Function
  },
  setup(e, { attrs }) {
    let label = ref('')
    let option = inject('toEditOption')
    const optionStore = useOptionStore()

    const state = computed(() => {
      return !!option.value.id
    })

    label.value = option.value?.label || ''

    async function onSubmit() {
      if (state.value) {
        const { id } = option.value
        await optionStore.updateOption({
          id,
          label: label.value
        })
        e.onAction()
        return
      }

      await optionStore.addOption({ label: label.value })
      e.onAction()
    }

    return { option, label, state, onSubmit }
  }
})
