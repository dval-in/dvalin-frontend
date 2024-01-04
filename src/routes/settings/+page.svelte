<h1>Settings</h1>
<h2>Profile: Traveler</h2>

<p>Testing... Testing... If you see this, this page is officially locally deployed!</p>

<script>
    // Sample Settings object
    let settings = {
        name: "Dval In",
        email: "dval_in@example.com",
        password: "dv@l_IN",
        theme: 1,
        safetyButton: "/recovery", // Placeholder link
        importExportButton: "" // Placeholder for file path
        };

    // Function to handle file selection
    function handleFileSelect() {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = event => {
            const file = event.target.files[0]; // error here
            // Handle file operations here
            console.log("Selected file:", file.name);
        };
        input.click();
    }
</script>

<!-- HTML Structure -->
<div>
    <button on:click={() => window.location.href = settings.safetyButton}>
        Forgot User/Pass
    </button>
    <button on:click={handleFileSelect}>
        Import/Export Files
    </button>
</div>

<style>
    /* Add any styling here if needed */
</style>
