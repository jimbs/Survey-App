import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useOptionStore = defineStore('options', () => {
  const options = ref([])
  const url = import.meta.env.VITE_APP_API_BASE_URL + '/option'

  async function getOptions() {
    const res = await fetch(url + 's').then((res) => res.json())
    options.value = res
    return options.value
  }

  async function addOption(params) {
    const res = await fetch(url + '/create', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(params)
    })

    return res.json()
  }

  async function updateOption(params) {
    const res = await fetch(url + `/update/${params.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(params)
    })

    if (res.ok) {
      options.value[options.value.findIndex((opt) => opt.id == params.id)].label = params.label
      // options.value
      return true
    }
  }

  async function removeOption(id) {
    const res = await fetch(url + `/delete/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    })

    if (res.ok)
      options.value.splice(
        options.value.findIndex((opt) => opt.id == id),
        1
      )

    return res.ok
  }

  return { options, getOptions, updateOption, addOption, removeOption }
})
