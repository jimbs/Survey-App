import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useOptionStore } from './options'

export const useSurveyStore = defineStore('surveys', () => {
  const optionStore = useOptionStore()
  const surveys = ref([])
  const url = import.meta.env.VITE_APP_API_BASE_URL + '/survey'

  const getSurveyAccordion = computed(() => {
    console.log(optionStore.options.value)
    return surveys.value.map((survey) => {
      return {
        ...survey,
        options: { ...optionStore.options.filter((opt) => opt.survey_id == survey.id) }
      }
    })
  })

  async function getSurveys() {
    const res = await fetch(url + 's').then((res) => res.json())
    surveys.value = res
    return surveys.value
  }

  async function addSurvey(params) {
    const res = await fetch(url + '/create', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(params)
    })

    return res.json()
  }

  async function updateSurvey(params) {
    const res = await fetch(url + `/update/${params.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(params)
    })

    if (res.ok) {
      surveys.value[surveys.value.findIndex((surv) => surv.id == params.id)].question =
        params.question
      // surveys.value
      return true
    }
  }

  async function removeSurvey(id) {
    const res = await fetch(url + `/delete/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    })

    if (res.ok)
      surveys.value.splice(
        surveys.value.findIndex((surv) => surv.id == id),
        1
      )

    return res.ok
  }

  return { surveys, getSurveyAccordion, getSurveys, updateSurvey, addSurvey, removeSurvey }
})
