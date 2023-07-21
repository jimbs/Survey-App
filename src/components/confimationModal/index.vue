<template>
  <v-dialog v-model="show">
    <div class="justify-center text-center d-flex">
      <v-card title="Confirm Delete" width="25rem" text="Are you sure to delete a survey question ?">
        <v-card-actions class="justify-end align-right pr-2">
          <v-btn color="#AAA" @click="onHide">Cancel</v-btn>
          <v-btn color="error" @click="onProcess">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script src="./script.js" />

<style lang="scss" scoped src="./styles.scss"></style>
