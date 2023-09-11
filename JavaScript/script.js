class Calculator {
    constructor(textOpSebelum, textOpSekarang) {
        this.textOpSebelum = textOpSebelum
        this.textOpSekarang = textOpSekarang
        this.clear()    
    }

    clear() {
        this.opSekarang = ''
        this.opSebelum = ''
        this.operasi = undefined
    }

    tambahAngka(angka) {
        if (angka === '.' && this.opSekarang.includes('.')) return
        this.opSekarang = this.opSekarang.toString() + angka.toString()
    }

    pilihanOperasi(operasi) {
        if (this.opSekarang === '') return
        if (this.opSebelum !== '') {
            this.hitung()
        }
        this.operasi = operasi
        this.opSebelum = this.opSekarang
        this.opSekarang = ''
    }

    hitung() {
        let komputasi
        const sebelum = parseFloat(this.opSebelum)
        const sekarang = parseFloat(this.opSekarang)
        if (isNaN(sebelum) || isNaN(sekarang)) return
        switch (this.operasi) {
            case '+':
                komputasi = sebelum + sekarang
                break
            case '-':
                komputasi = sebelum - sekarang
                break
            case 'x':
                komputasi = sebelum * sekarang
                break
            case '÷':
                komputasi = sebelum / sekarang
                break
            default:
                return
        }
        this.opSekarang = komputasi
        this.operasi = undefined
        this.opSebelum = ''
    }

    hapus() {
        this.opSekarang = this.opSekarang.toString().slice(0, -1)
    }

    getDisplayNumber(angka) {
        const stringAngka = angka.toString()
        const digitInteger = parseFloat(stringAngka.split('.')[0])
        const digitDesimal = stringAngka.split('.')[1]
        let integerDisplay
        if (isNaN(digitInteger)) {
            integerDisplay = ''
        } else {
            integerDisplay = digitInteger.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (digitDesimal != null) {
            return `${integerDisplay}.${digitDesimal}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.textOpSekarang.innerText = this.getDisplayNumber(this.opSekarang)
        if (this.operasi != null) {
            this.textOpSebelum.innerText = `${this.getDisplayNumber(this.opSebelum)} ${this.operasi}`
        } else {
            this.textOpSebelum.innerText = ''
        }
    }

}


const buttonAngka = document.querySelectorAll('[data-angka]')
const buttonOperasi = document.querySelectorAll('[data-operasi]')
const buttonEkivalen = document.querySelector('[data-ekivalen]')
const buttonDelete = document.querySelector('[data-delete]')
const buttonClear = document.querySelector('[data-clear]')
const textOpSebelum = document.querySelector('[data-op-sebelum]')
const textOpSekarang = document.querySelector('[data-op-sekarang]')


const calc = new Calculator(textOpSebelum, textOpSekarang)


buttonAngka.forEach(button => {
    button.addEventListener('click', () => {
        calc.tambahAngka(button.innerText)
        calc.updateDisplay()
    })
})

buttonOperasi.forEach(button => {
    button.addEventListener('click', () => {
        calc.pilihanOperasi(button.innerText)
        calc.updateDisplay()
    })
})

buttonEkivalen.addEventListener('click', button => {
    calc.hitung()
    calc.updateDisplay()
})

buttonClear.addEventListener('click', button => {
    calc.clear()
    calc.updateDisplay()
})

buttonDelete.addEventListener('click', button => {
    calc.hapus()
    calc.updateDisplay()
})
