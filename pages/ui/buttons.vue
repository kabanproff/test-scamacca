<template>
  <div class="container" style="padding: 20px;">
    <UiButton href ="/ui">Back</UiButton>
    <h2>Primary-black</h2>
    <div class="btn-row">
      <div>Default</div>
      <div>Active/Hover</div>
      <div>Disabled</div>
      <div>
        <UiButton variant="primary-black">Связаться</UiButton>
      </div>
      <div>
        <UiButton
          variant="primary-black"
          class-name="active"
          >Связаться</UiButton
        >
      </div>
      <div>
        <UiButton
          variant="primary-black"
          disabled
          >Связаться</UiButton
        >
      </div>
    </div>

    <h2>Primary-light</h2>
    <div
      class="btn-row"
      style="
        background-color: var(--bg-dark-lightdark);
        color: var(--text-light-primary);
      "
    >
      <div>Default</div>
      <div>Active/Hover</div>
      <div>Disabled</div>
      <div>
        <UiButton variant="primary-light">Связаться</UiButton>
      </div>
      <div>
        <UiButton
          variant="primary-light"
          class-name="active"
          >Связаться</UiButton
        >
      </div>
      <div>
        <UiButton
          variant="primary-light"
          disabled
          >Связаться</UiButton
        >
      </div>
    </div>

    <h2>Secondary-light</h2>
    <div
      class="btn-row"
      style="
        background-color: var(--bg-dark-lightdark);
        color: var(--text-light-primary);
      "
    >
      <div>Default</div>
      <div>Active/Hover</div>
      <div>Disabled</div>
      <div>
        <UiButton variant="secondary-light">Связаться</UiButton>
      </div>
      <div>
        <UiButton
          variant="secondary-light"
          class-name="active"
          >Связаться</UiButton
        >
      </div>
      <div>
        <UiButton
          variant="secondary-light"
          disabled
          >Связаться</UiButton
        >
      </div>
    </div>

    <h2>Secondary-black</h2>
    <div class="btn-row">
      <div>Default</div>
      <div>Active/Hover</div>
      <div>Disabled</div>
      <div>
        <UiButton variant="secondary-black">Связаться</UiButton>
      </div>
      <div>
        <UiButton
          variant="secondary-black"
          class-name="active"
          >Связаться</UiButton
        >
      </div>
      <div>
        <UiButton
          variant="secondary-black"
          disabled
          >Связаться</UiButton
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.25rem;
  color: #222;
}

.btn-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex-direction: row;
  gap: 58px;
  margin-bottom: 1.5rem;
}
</style>
