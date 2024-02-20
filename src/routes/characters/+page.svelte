<script lang="ts">
  // Import necessary components and dependencies
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';

  // Define characters directly within the component
  const characters = [
    { name: 'Character 1', description: 'Description 1' },
    { name: 'Character 2', description: 'Description 2' },
    { name: 'Character 3', description: 'Description 3' }
    // Add more characters as needed
  ];
</script>

<div>
  <div class="flex flex-col gap-y-3">
    <!-- Characters Section -->
    <Card.Root>
      <Card.Header>
        <Card.Title style="font-size: 21px"><b><u>Characters</u></b></Card.Title>
      </Card.Header>
      <Card.Content>
        <!-- Display list of characters -->
        {#each characters as character}
          <div class="rounded-xl border-2 border-border bg-black/20 p-3">
            <p style="font-size: 18px"><b>{character.name}</b></p>
            <p>{character.description}</p>
          </div>
        {/each}
      </Card.Content>
    </Card.Root>

    <!-- Add more sections as needed -->
  </div>
</div>
