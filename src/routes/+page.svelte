<script>
    let openaiApiKey = "";
    let openaiOrgId = "";
    let videoUrl = "";

    function submit() {
        console.log("submitting");
        console.log(openaiApiKey);
        console.log(openaiOrgId);
        console.log(videoUrl);
    }
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center px-4">
  <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-10">Youtube Video Summarizer</h1>
  <div class="container h-full mx-auto gap-8 flex flex-col mt-20 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
    <form class="card p-4 flex flex-col gap-3">
      <label class="text-lg sm:text-xl">Openai API key:
        <input type="text" bind:value={openaiApiKey} class="input mt-1 w-full p-2"/>
      </label>
      <label class="text-lg sm:text-xl">Openai Organization ID:
        <input type="text" bind:value={openaiOrgId} class="input mt-1 w-full p-2"/>
      </label>
      <label class="text-lg sm:text-xl">Video Url:
        <input type="text" bind:value={videoUrl} class="input mt-1 w-full p-2"/>
      </label>

      <button class="btn variant-ghost-primary self-center" on:click={submit}>Submit</button>
    </form>
  </div>
</div>