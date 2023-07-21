import { ref, defineProps, computed, onUpdated, toRefs, defineComponent } from 'vue'

export default defineComponent({
  name: 'OptionModal',
  props: {
    show: Boolean,
    id: String | Number,
    option: Object,
    onHide: Function
  },
  setup(e, { attrs }) {
    let props = toRefs(e)
    let label = computed(() => {
      return props.option.value.id ?? ""
    })
    // onUpdated(() => {
    //   label.value = props.option.value.label
    // })

    const state = computed(() => {
      return !!props.option.value.id
    })

    return { ...props, label, state }
  }
})
