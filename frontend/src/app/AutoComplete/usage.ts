<AutoComplete
  inputLabel={label ? label : "Search Staff"}
  inputRequired={isRequired ? true : false}
  inputPlaceholder={"Enter staff name to search"}
  showAddNewItem={true}
  addNewItemText={"Add new staff"}
  searchedItems={staffs}
  selectedItems={selectedStaffs}
  onSearch={this.searchStaffs}
  addNewItem={this.showAddStaffModal}
  onSelectItem={this.onSelectStaff}
  onRemoveItem={this.onRemoveStaff}
  onSaveSelect={this.saveSelectedStaffs}
/>;
