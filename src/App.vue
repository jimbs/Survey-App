<template>
  <div>
    <div class="text-h4 mb-5 mt-2">Survey APP</div>
    <div class="container d-flex flex-column">
      <div class="btn-actions d-flex justify-end">
        <v-btn
          :ripple="false"
          class="mb-1 mr-4 elevation-0"
          color="#b6d75d"
          size="small"
          prepend-icon="mdi-plus"
          @click="addQuestion"
        >
          Add Question
        </v-btn>
      </div>
      <div v-if="!surveys.length" class="justify-center align-center d-flex border rounded py-2">
        No Question Available
      </div>
      <v-expansion-panels v-else theme="dark" multiple variant="popout" :key="surveys.length">
        <v-expansion-panel v-for="(_survey, i) in surveys" :key="i">
          <v-expansion-panel-title>
            <template v-slot:actions="{ expanded }">
              <span
                @click="
                  (e) => {
                    showStatistic(e)
                  }
                "
                class="edit-btn mdil mdil-chart-histogram mdil-size-10 transition-delay mr-1"
              />
              <span
                @click="(e) => onClickDelete(e, _survey.id)"
                class="edit-btn mdil mdil-delete mdil-size-10 transition-delay mr-1"
              />
              <span
                class="mdil mdil-chevron-up transition-delay"
                :class="{
                  'rotate-180': expanded
                }"
              />
            </template>
            {{ _survey.question }}
            <span
              @click="(e) => editQuestion(e, _survey.id)"
              class="edit-btn mdil mdil-pencil mdil-size-10 transition-delay ml-2"
            />
          </v-expansion-panel-title>
          <v-expansion-panel-text variant="light" class="text-left">
            <v-radio-group v-model="_survey['answer']" hide-details>
              <v-radio v-for="(opt, i) in _survey.options" :label="opt.label" :value="opt.id">
                <template v-slot:label>
                  <span class="text-subtitle-1">
                    {{ opt.label }}
                  </span>
                  <div>
                    <span
                      @click="(e) => editOption(e, [_survey.id, i])"
                      class="edit-btn mdil mdil-pencil mdil-size-10 transition-delay ml-4"
                    />
                    <span
                      @click="(e) => onClickDelete(e, _survey.id)"
                      class="edit-btn mdil mdil-delete mdil-size-10 transition-delay ml-1"
                    />
                  </div> </template
              ></v-radio>
            </v-radio-group>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <survey-modal
        :key="showEditSurvey"
        :show="showEditSurvey"
        @hide="hideModal"
        @action="apiSuccess"
      />

      <option-modal
        :key="showEditOption"
        :show="showEditOption"
        @hide="hideModal"
        @action="apiSuccess"
      />

      <confirmation-modal
        :show="showConfirmation"
        @hide="hideModal"
        @Process="
          () => {
            surveyStore.removeSurvey(focusedSurveyId)
            hideModal()
          }
        "
      />
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, computed, onBeforeMount } from 'vue'
import { useSurveyStore } from '@/stores/surveys'
import { useOptionStore } from '@/stores/options'
import surveyModal from './components/surveyModal/index.vue'
import optionModal from './components/optionModal/index.vue'
import confirmationModal from './components/confimationModal/index.vue'

const surveyStore = useSurveyStore()
const optionStore = useOptionStore()

let showEditSurvey = ref(false)
let showEditOption = ref(false)
let showConfirmation = ref(false)
let focusedSurveyId = ref(0)
let optionSurveysIndex = ref(0)
let surveys = ref([])

let focusedSurvey = computed(() => {
  const { value } = surveys

  return focusedSurveyId.value
    ? value.find((survey) => survey.id == focusedSurveyId.value)
    : { question: '' }
})

let focusedOption = computed(() => {
  const { value } = focusedSurvey

  console.log(value.id ? value.options[optionSurveysIndex.value] : { label: '' })

  return value.id ? value.options[optionSurveysIndex.value] : { label: '' }
})

function editQuestion(e, id) {
  stopPropagation(e)
  focusedSurveyId.value = id
  showEditSurvey.value = !showEditSurvey.value
}

function editOption(e, arr) {
  stopPropagation(e)
  optionSurveysIndex.value = arr[1]
  focusedSurveyId.value = arr[0]
  showEditOption.value = !showEditSurvey.value
}

function addQuestion(e) {
  showEditSurvey.value = !showEditSurvey.value
}

function addOption(e) {
  showEditSurvey.value = !showEditSurvey.value
}

function apiSuccess() {
  updateSurveyState()
  hideModal()
}

function hideModal() {
  showEditSurvey.value = false
  showEditOption.value = false
  showConfirmation.value = false
  focusedSurveyId.value = 0
  optionSurveysIndex.value = 0
}

async function updateSurveyState() {
  const res = await surveyStore.getSurveys('/surveys')
  surveys.value = surveyStore.getSurveyAccordion
}

async function onClickDelete(e, id) {
  e.preventDefault()
  e.stopPropagation()
  focusedSurveyId.value = id
  showConfirmation.value = !showConfirmation.value
}

function showStatistic(e) {
  stopPropagation(e)
}

function stopPropagation(e) {
  e.stopPropagation()
  e.preventDefault()
}

provide('toEditSurvey', focusedSurvey)

provide('toEditOption', focusedOption)

onMounted(async () => {})
onBeforeMount(async () => {
  await optionStore.getOptions()
  await updateSurveyState()
})
</script>

<style lang="sass" scoped>
.v-expansion-panels
  width: 100%
  .v-expansion-panel-title
    background-color: #EEE
    border-color: #EEE
    color: #000
    font-size: medium

.container
  text-align: right
</style>
