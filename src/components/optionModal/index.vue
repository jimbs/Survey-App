<template>
  <v-dialog v-model="show">
    <div class="justify-center text-center d-flex">
      <v-card :title="`${state ? 'Edit' : 'Add'} Survey`" width="25rem" :text="option.label">
        <v-card-item>
          <v-text-field class="border" label="Question" hide-details v-model="label" />
        </v-card-item>
        <template v-slot:append>
          <a
            class="close-icon mdil mdil-plus mdil-rotate-45 mdil-18px background-light-green-darken-1 text-black"
            @click="onHide"
          />
        </template>
        <v-card-actions class="justify-end align-right pr-2">
          <v-btn color="#7CB342">{{ state ? 'Update' : 'Create' }}</v-btn>
          <v-btn color="#AAA" @click="onHide">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script src="./script.js" />

<style lang="scss" scoped src="./styles.scss"></style>
