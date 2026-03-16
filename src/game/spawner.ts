import { MeshBuilder, Vector3 } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import { words } from "./words";

export function spawnWord(scene: any){
    const plane = MeshBuilder.CreatePlane("word", { size: 2 }, scene);
    plane.position = new Vector3(Math.random()*6 - 3, 8, 0);

    const texture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);

    const text = new GUI.TextBlock();
    const randomWord = words[Math.floor(Math.random()*words.length)];

    text.text = randomWord;
    text.color = "white";
    text.fontSize = 120;

    texture.addControl(text);

    plane.metadata = { word: randomWord };

    return plane;
}