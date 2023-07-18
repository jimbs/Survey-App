<template>
  <div>
    <div class="text-h3 mb-5 mt-2">Survey APP</div>
    <div class="contianer">
      <v-expansion-panels theme="dark" multiple variant="popout">
        <v-expansion-panel v-for="(x, i) in Array(3).fill(`Title`)" :key="i">
          <v-expansion-panel-title
            ><template v-slot:actions="{ expanded }">
              <span
                class="mdil mdil-chevron-up transition-delay"
                :class="{
                  'rotate-180': expanded
                }"
              />
            </template>
            {{ x }}</v-expansion-panel-title
          >
          <v-expansion-panel-text variant="light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis
            est labore voluptatibus! Eaque cupiditate minima
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
