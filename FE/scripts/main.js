const fetchData = () => {}
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((json) => {
    if (json.length > 0) {
      console.log(json)
      json.forEach((item, index) => {
        item.id = index
        item.content =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        $("#cards-overview").append(renderSingleNote(item))
      })
    }
  })

$(document).ready(() => {
  fetchData()
})

const confirmAddNewNote = () => {
  const title = $("#note_title").val()
  const content = $("#note_content").val()
  console.log("DATA: ", title, content)

  const noteWrapper = $(".notes-wrapper")
  const newNote = renderSingleNote({ id: 1902301823, title, content })
  noteWrapper.prepend(newNote)
}

const confirmUpdate = (id) => {
  const newData = $(`#update-note-text-${id}`).val()
  console.log(newData)
}

const confirmDelete = (id) => {
  console.log(id)
  $(`#note-${id}`).remove()
  $(`#note modal-${id}`).hide()
  $(".modal-backdrop").remove()
}

const renderSingleNote = (data) => {
  return `
    <div class='col-lg-3 col-md-4 col-sm-6 col-xs-12 single-note-wrapper' id="note-${data?.id}">
        <div class='inner-wrapper'>
            <div class='title'>
                ${data?.title}
            </div>
            <div class='content'>
                ${data?.content}
            </div>
            <div class='actions text-right'>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#view_${data.id}">View</button>
                <button type="button" class='btn btn-info' data-toggle="modal" data-target="#edit_${data.id}" >Edit</button>
                <button type="button" class='btn btn-danger' data-toggle="modal" data-target="#delete_${data.id}" >Delete</button>
            </div>
        </div>
        <!-- VIEW -->
        <div class="modal fade" id="view_${data.id}" tabindex="-1" role="dialog" aria-labelledby="view_${data.id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${data.title}</h5>
                    </div>
                    <div class="modal-body">
                        <p>${data.content}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="edit_${data.id}"" tabindex="-1" role="dialog" aria-labelledby="edit_${data.id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${data.title}</h5>
                    </div>
                    <div class="modal-body">
                        <textarea id='update-note-text-${data.id}'>${data.content}</textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick="confirmUpdate(${data.id})">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delete_${data.id}" tabindex="-1" role="dialog" aria-labelledby="deleteNote-${data.id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Are you sure you want to delete this note?</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick="confirmDelete(${data.id})">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    `
}

const login = () => {
  const username = $("#login_username").val()
  const password = $("#login_password").val()

  console.log(username, password)

  window.location.href =
    "/index.html"
}

const register = () => {
  const username = $("#register_username").val()
  const password = $("#register_password").val()
  const repeatPassword = $("#register_repeat_password").val()

  console.log(username, password, repeatPassword)
}
