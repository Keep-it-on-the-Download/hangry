async function runContactPicker() {
  const props = ['name', 'email', 'tel', 'address', 'icon'];
  const opts = { multiple: true };

  const contacts = await navigator.contacts.select(props, opts);
  console.table(contacts);
  console.log('DO SOMETHING WITH CONTACTS');
}

if ('contacts' in navigator && 'ContactsManager' in window) {
  runContactPicker();
} else {
  console.log('%cContact Picking Unsupported', 'color: #FF8C00');
}
