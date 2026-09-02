// =======================================================
// 1. SUPABASE CONFIG — replace with YOUR project's values
//    Find these in: Supabase Dashboard > Project Settings > API
// =======================================================
const SUPABASE_URL = "https://srqdipytxulqajgbwxxq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_TLHtVviDt4AWYxtlNPbFdQ_7oamrlEu";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =======================================================
// 2. DOM ELEMENTS
// =======================================================
const form = document.getElementById("student-form");
const tbody = document.getElementById("students-tbody");
const formTitle = document.getElementById("form-title");
const recordIdField = document.getElementById("record-id");
const cancelBtn = document.getElementById("cancel-btn");

const confirmModal = document.getElementById("confirm-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
let pendingDeleteId = null;

// =======================================================
// 3. READ — fetch and display all records
// =======================================================
async function loadStudents() {
  const { data, error } = await supabaseClient
    .from("students")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    alert("Error loading records: " + error.message);
    return;
  }

  tbody.innerHTML = "";
  data.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.student_id}</td>
      <td>${student.full_name}</td>
      <td>${student.program}</td>
      <td>${student.year_level}</td>
      <td>${student.email}</td>
      <td>
        <button class="edit-btn" data-id="${student.id}">Edit</button>
        <button class="delete-btn" data-id="${student.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// =======================================================
// 4. CREATE / UPDATE — form submit handles both
// =======================================================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const record = {
    student_id: document.getElementById("student_id").value.trim(),
    full_name: document.getElementById("full_name").value.trim(),
    program: document.getElementById("program").value.trim(),
    year_level: document.getElementById("year_level").value,
    email: document.getElementById("email").value.trim(),
  };

  const editingId = recordIdField.value;

  let error;
  if (editingId) {
    // UPDATE existing record
    ({ error } = await supabaseClient.from("students").update(record).eq("id", editingId));
  } else {
    // CREATE new record
    ({ error } = await supabaseClient.from("students").insert([record]));
  }

  if (error) {
    alert("Error saving record: " + error.message);
    return;
  }

  resetForm();
  loadStudents();
});

// =======================================================
// 5. EDIT — populate form with the selected record
// =======================================================
tbody.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.dataset.id;
    const { data, error } = await supabaseClient.from("students").select("*").eq("id", id).single();
    if (error) {
      alert("Error fetching record: " + error.message);
      return;
    }
    recordIdField.value = data.id;
    document.getElementById("student_id").value = data.student_id;
    document.getElementById("full_name").value = data.full_name;
    document.getElementById("program").value = data.program;
    document.getElementById("year_level").value = data.year_level;
    document.getElementById("email").value = data.email;

    formTitle.textContent = "Edit Student Record";
    cancelBtn.style.display = "inline-block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (e.target.classList.contains("delete-btn")) {
    pendingDeleteId = e.target.dataset.id;
    confirmModal.classList.remove("hidden");
  }
});

// =======================================================
// 6. DELETE — with confirmation modal
// =======================================================
confirmDeleteBtn.addEventListener("click", async () => {
  const { error } = await supabaseClient.from("students").delete().eq("id", pendingDeleteId);
  if (error) {
    alert("Error deleting record: " + error.message);
  }
  pendingDeleteId = null;
  confirmModal.classList.add("hidden");
  loadStudents();
});

cancelDeleteBtn.addEventListener("click", () => {
  pendingDeleteId = null;
  confirmModal.classList.add("hidden");
});

// =======================================================
// 7. CANCEL EDIT
// =======================================================
cancelBtn.addEventListener("click", resetForm);

function resetForm() {
  form.reset();
  recordIdField.value = "";
  formTitle.textContent = "Add Student Record";
  cancelBtn.style.display = "none";
}

// =======================================================
// 8. INITIAL LOAD
// =======================================================
loadStudents();
