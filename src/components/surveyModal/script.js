import { ref, inject, computed, onUpdated, toRefs, defineComponent } from 'vue'
import { useSurveyStore } from '../../stores/surveys'

export default defineComponent({
  name: 'SurveyModal',
  props: {
    show: Boolean,
    onHide: Function,
    onAction: Function
  },
  setup(e, { attrs }) {
    let question = ref('')
    let survey = inject('toEditSurvey')
    const surveyStore = useSurveyStore()

    const state = computed(() => {
      return !!survey.value.id
    })

    question.value = survey.value?.question || ''

    async function onSubmit() {
      if (state.value) {
        const { id } = survey.value
        await surveyStore.updateSurvey({
          id,
          question: question.value
        })
        e.onAction()
        return
      }

      await surveyStore.addSurvey({ question: question.value })
      e.onAction()
    }

    return { survey, question, state, onSubmit }
  }
})
