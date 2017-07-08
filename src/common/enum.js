class EnumConstant {
    constructor(name, type) {
        this.name = name
        this.type = type
    }

    toString() {
        return `${this.type.name}#${this.name}`
    }
}

export function EnumType(name, constants) {
    const values = {}
    for (const name of constants) {
        values[name] = new EnumConstant(name, this)
        this[name] = values[name]
    }
    
    this.constants = values
    this.name = name
}

