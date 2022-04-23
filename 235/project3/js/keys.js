const controls = Object.freeze(
    {
        SHIFT: 16,
        SPACE: 32,
        LEFT: 37,
        UP: 38, 
        RIGHT: 39, 
        DOWN: 40
    });
const keys = [];
window.onkeyup = (e) =>
{
    keys[e.keyCode] = false;
	e.preventDefault();
}
window.onkeydown = (e) =>
{
    keys[e.keyCode] = true;
}