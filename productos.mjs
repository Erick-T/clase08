export class Productos {
    constructor() {
        this.array = [];
        this.count = 0;
    }

    getArray() {
        return this.array;
    }

    getElementById(id) {
        return this.array.filter(el => el.id === Number(id));
    }

    addElement(producto) {
        this.array.push({ ...producto, id: this.count + 1 });
        this.count++
        return producto;
    }

    actualizarProducto(producto, id) {
        return this.array[id - 1] = { ...producto, id: Number(id) }
    }

    borrarProductoById(id) {
        this.array = this.array.filter(element => element.id !== Number(id))
    }
}
