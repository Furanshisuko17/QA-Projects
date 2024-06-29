<script lang="ts">
  export let note;
</script>

<div class="note">
  <div class="note-title">{note.title}</div>
  <div class="note-body">{note.body}</div>
</div>

<style>
  .note {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 16px;
    margin-bottom: 16px;
  }

  .note-title {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .note-body {
    font-size: 14px;
    line-height: 1.5;
  }
</style>
