import * as GUI from "@babylonjs/gui";
import { Scene } from "@babylonjs/core";

let scoreText: GUI.TextBlock;
let typingText: GUI.TextBlock;

export function setupHUD(scene: Scene): void {
    const gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    // Score display
    scoreText = new GUI.TextBlock();
    scoreText.text = "Score: 0";
    scoreText.color = "white";
    scoreText.fontSize = 24;
    scoreText.top = "-45%";
    scoreText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    scoreText.left = "20px";
    gui.addControl(scoreText);

    // Typing display
    typingText = new GUI.TextBlock();
    typingText.text = "Type: ";
    typingText.color = "#00ff88";
    typingText.fontSize = 32;
    typingText.top = "40%";
    typingText.fontFamily = "monospace";
    typingText.fontWeight = "bold";
    gui.addControl(typingText);
}

export function updateScore(score: number): void {
    if (scoreText) {
        scoreText.text = "Score: " + score;
    }
}

export function updateTypingDisplay(typed: string): void {
    if (typingText) {
        typingText.text = "Type: " + (typed || "_");
    }
}