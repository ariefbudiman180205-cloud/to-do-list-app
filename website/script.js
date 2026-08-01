let daftarTugasArray = [];

const inputTugas = document.getElementById("inputTugas");
const tombolTambah = document.getElementById("tombolTambah");
const daftarTugas = document.getElementById("daftarTugas");

function tampilkanTugas() {
    daftarTugas.innerHTML = "";

    for (let i = 0; i < daftarTugasArray.length; i++) {
        const tugas = daftarTugasArray[i];
        const kelasSelesai = tugas.selesai ? "selesai" : "";

        daftarTugas.innerHTML += 
            "<div class='item-tugas'>" +
                "<input type='checkbox' onclick='toggleSelesai(" + i + ")' " + (tugas.selesai ? "checked" : "") + ">" +
                "<span class='" + kelasSelesai + "'>" + tugas.teks + "</span>" +
                "<button onclick='hapusTugas(" + i + ")'>Hapus</button>" +
            "</div>";
    }
}

function hapusTugas(index) {
    daftarTugasArray.splice(index, 1);
    simpanData();
    tampilkanTugas();
}

function toggleSelesai(index) {
    daftarTugasArray[index].selesai = !daftarTugasArray[index].selesai;
    simpanData();
    tampilkanTugas();
}

function simpanData() {
    localStorage.setItem("tugasTersimpan", JSON.stringify(daftarTugasArray));
}

function muatData() {
    const data = localStorage.getItem("tugasTersimpan");
    if (data) {
        daftarTugasArray = JSON.parse(data);
    }
}

tombolTambah.addEventListener("click", function() {
    const tugasBaru = inputTugas.value;

    if (tugasBaru === "") {
        alert("Tugas gak boleh kosong!");
    } else {
        daftarTugasArray.push({ teks: tugasBaru, selesai: false });
        simpanData();
        tampilkanTugas();
        inputTugas.value = "";
    }
});

muatData();
tampilkanTugas();