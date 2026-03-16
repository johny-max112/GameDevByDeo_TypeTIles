import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight } from "@babylonjs/core";
import { spawnWord } from "./game/spawner";
import { typedWord } from "./game/input";
import { setupHUD, updateScore, updateTypingDisplay } from "./ui/hud";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    
    const engine = new Engine(canvas, true);

    let score = 0;
    let currentTypedWord = "";
    const fallingWords: any[] = [];

    const createScene = () => {
        const scene = new Scene(engine);

        // Camera
        const camera = new ArcRotateCamera("camera", Math.PI/2, Math.PI/2.5, 15, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // Light
        new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Setup HUD
        setupHUD(scene);

        return scene;
    };

    const scene = createScene();

    // Spawn words every 2 seconds
    setInterval(()=>{
        const word = spawnWord(scene);
        fallingWords.push(word);
    }, 2000);

    // Render loop
    engine.runRenderLoop(() => {
        // Update current typed word from input module
        currentTypedWord = typedWord;
        updateTypingDisplay(currentTypedWord);

        for (let i = fallingWords.length - 1; i >= 0; i--) {
            const word = fallingWords[i];
            word.position.y -= 0.03;

            // If typed correctly
            if(currentTypedWord.toLowerCase() === word.metadata.word.toLowerCase()){
                word.dispose();
                fallingWords.splice(i, 1);
                score += 10;
                updateScore(score);
                // Clear typed word after match
                (window as any).clearTypedWord();
                continue;
            }

            // Missed - word fell off screen without being typed correctly
            if(word.position.y < -5){
                word.dispose();
                fallingWords.splice(i, 1);
                // Decrease score for missed word
                score = Math.max(0, score - 5);
                updateScore(score);
            }
        }

        scene.render();
    });

    // Resize canvas on window resize
    window.addEventListener("resize", ()=>{
        engine.resize();
    });
});