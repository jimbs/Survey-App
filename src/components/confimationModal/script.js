import { toRefs, defineComponent } from 'vue'

export default defineComponent({
  name: 'SurveyModal',
  props: {
    show: Boolean,
    onHide: Function,
    onProcess: Function
  },
  setup(e, { attrs }) {

    return { ...toRefs(e) }
  }
})
