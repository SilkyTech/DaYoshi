<script lang="ts">
    import CurvedButton from "../component/CurvedButton.svelte";
    import Modal from "../component/Modal.svelte";
    import * as int from '../Internal' 
    import Toggle from '../component/Toggle.svelte'
    import { settings as _settings } from '../stores'
	import { onMount } from "svelte";

    export let token: string;

    let modal: Modal;

    let {
        potato
    } = _settings;


    export function open() {
        modal.openModal();
    }


    onMount(() => {
        let settingsD = localStorage.getItem("settings")
        if (settingsD !== null) {
            let set = JSON.parse(settingsD);
            $potato.notifs = set?.potato?.notifs ?? true;
            $potato.petAnim = set?.potato?.petAnim ?? true;
        } else {
            $potato.notifs = true;
            $potato.petAnim = true;
            saveSettings()
        }
    })
    

    function saveSettings() {
        localStorage.setItem("settings", JSON.stringify({potato: {...$potato}}))
        modal.closeModal();
    }
    
</script>



<Modal bind:this={modal}>
    <h1>Settings Menu</h1>
    <hr>
    <h3>Save Options:</h3>
    <CurvedButton onclick={() => int.save.saveSave(token)}>Save save</CurvedButton>
    <h3>Potato PC options:</h3>
    <span class="option-label">Notifications at cursor: </span><Toggle bind:on={$potato.notifs}></Toggle><br>
    <span class="option-label">Pet animation: </span><Toggle bind:on={$potato.petAnim}></Toggle><br>
    <hr>
    <CurvedButton onclick={saveSettings}>Save Settings</CurvedButton>
</Modal>

