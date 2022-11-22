import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AthleteProfile from "./AthleteProfile";
import ChildrenTable from "./ChildrenTable";
import GuardianProfile from "./GuardianProfile";

describe("Render athlete profile", () => {
    test("Athlete component is rendering", () => {
        render(<AthleteProfile />);
        const name = screen.getByTestId('athlete_component');
        expect(name).toBeInTheDocument();
    })

    test("Edit button is clickable", () => {
        render(<AthleteProfile />);
        const editIcon = screen.getByTestId('edit_icon');
        userEvent.click(editIcon);
    })

    test("Edit modal opens on click of edit button", () => {
        render(<AthleteProfile />);
        const editIcon = screen.getByTestId('edit_icon');
        userEvent.click(editIcon);
        const modal = screen.getByTestId('modal_name');
        expect(modal).toBeInTheDocument();
    })

    test("Name input is editable", () => {
        render(<AthleteProfile />)
        const editIcon = screen.getByTestId('edit_icon');
        userEvent.click(editIcon);
        const testValue = "test";
        const nameInputEl = screen.getByTestId('name_field');
        fireEvent.change(nameInputEl, { target: { defaultValue: testValue } });
    })

    test("Save Changes button is clickable", () => {
        render(<AthleteProfile />)
        const editIcon = screen.getByTestId('edit_icon');
        userEvent.click(editIcon);
        const saveBtn = screen.getByTestId('save_btn');
        userEvent.click(saveBtn);
        expect(editIcon).toBeInTheDocument();
    })

    test("Name input should change and is saved after button click", () => {
        render(<AthleteProfile />)
        const editIcon = screen.getByTestId('edit_icon');
        userEvent.click(editIcon);
        const testValue = "test";
        const nameInputEl = screen.getByTestId('name_field')
        fireEvent.change(nameInputEl, { target: { defaultValue: testValue } });
        const saveBtn = screen.getByTestId('save_btn');
        userEvent.click(saveBtn);
        expect(editIcon).toBeInTheDocument();
    })

    test("Close button is clickable", () => {
        render(<AthleteProfile />);
        const editIcon = screen.getByTestId('edit_icon');
        userEvent.click(editIcon);
        const closeIcon = screen.getByTestId('close_icon');
        userEvent.click(closeIcon);
        const profileText = screen.getByText(/profile/i);
        expect(profileText).toBeInTheDocument();
    })
})

describe("Render guardian profile", () => {
    test("guardian profile renders", () => {
        render(<GuardianProfile />);
        const guardianText = screen.getByText('Guardian');
        expect(guardianText).toBeInTheDocument();
    })

    test("Edit button is clickable", () => {
        render(<GuardianProfile />)
        const editIcon = screen.getByTestId('edit_icon');
        userEvent.click(editIcon);
    })

    test("Edit modal opens on click of edit button", () => {
        render(<GuardianProfile />);
        const editIcon = screen.getByTestId('edit_icon');
        userEvent.click(editIcon);
        const modal = screen.getByText('Name');
        expect(modal).toBeVisible();
    })

    test("Name input is editable", () => {
        render(<GuardianProfile />);
        const editIcon = screen.getByTestId('edit_icon');
        userEvent.click(editIcon);
        const nameInput = screen.getByTestId('name_field');
        expect(nameInput).toBeInTheDocument();
        const testValue = "test";
        fireEvent.change(nameInput, { target: { defaultValue: testValue } });
    })

    test("Save button is clickable", () => {
        render(<GuardianProfile />);
        const editIcon = screen.getByTestId('edit_icon');
        userEvent.click(editIcon);
        const saveBtn = screen.getByTestId('save_btn');
        expect(saveBtn).toBeInTheDocument();
    })

    test("Name input should change and is saved after button click", () => {
        render(<GuardianProfile />);
        const editIcon = screen.getByTestId('edit_icon');
        userEvent.click(editIcon);
        const nameValue = screen.getByTestId('name_field');
        const testValue = "test";
        fireEvent.change(nameValue, { target: { defaultValue: testValue } });
        const saveBtn = screen.getByTestId('save_btn');
        expect(saveBtn).toBeInTheDocument();
    })

    test("children component renders in guardian profile", () => {
        render(<GuardianProfile />);
        const childComp = screen.getByText(/children/i);
        expect(childComp).toBeInTheDocument();
    })

    test("child component contains table", () => {
        render(<ChildrenTable />);
        const td = screen.getByText(/actions/i);
        expect(td).toBeInTheDocument();
    })

    test("Edit icon is clickable", () => {
        render(<ChildrenTable />);
        const editIcon = screen.getByTestId('edit_icon1');
        userEvent.click(editIcon);
    })

    test("Delete icon is clickable", () => {
        render(<GuardianProfile />);
        const deleteIcon = screen.getByTestId('delete_icon1');
        userEvent.click(deleteIcon);
    })

    test("Edit modal opens onclick of edit button", () => {
        render(<GuardianProfile />);
        const editIcon = screen.getByTestId('edit_icon1');
        userEvent.click(editIcon);
        const editModal = screen.getByText(/save changes/i);
        expect(editModal).toBeInTheDocument();
    })

    test("Name input field is editable", () => {
        render(<ChildrenTable />);
        const editIcon = screen.getByTestId('edit_icon1');
        userEvent.click(editIcon);
        const nameField = screen.getByTestId('name_field');
        const testValue = "test";
        fireEvent.change(nameField, { target: { defaultValue: testValue } });
        const saveBtn = screen.getByTestId('save_btn');
        userEvent.click(saveBtn);
    })

    test("Gender input field is editable", () => {
        render(<ChildrenTable />);
        const editIcon = screen.getByTestId('edit_icon1');
        userEvent.click(editIcon);
        const genderField = screen.getByTestId('gender_field');
        const testValue = "test";
        fireEvent.change(genderField, { target: { defaultValue: testValue } });
        const saveBtn = screen.getByTestId('save_btn');
        userEvent.click(saveBtn);
    })

    test("Birthdate input field is editable", () => {
        render(<ChildrenTable />);
        const editIcon = screen.getByTestId('edit_icon1');
        userEvent.click(editIcon);
        const birthdateField = screen.getByTestId('birthdate_field');
        const testValue = "test";
        fireEvent.change(birthdateField, { target: { defaultValue: testValue } });
        const saveBtn = screen.getByTestId('save_btn');
        userEvent.click(saveBtn);
    })

    test("Save Changes button is clickable", () => {
        render(<ChildrenTable />);
        const editIcon = screen.getByTestId('edit_icon1');
        userEvent.click(editIcon);
        const saveBtn = screen.getByTestId('save_btn');
        userEvent.click(saveBtn);
    })

    test("Close icon is closing the modal", () => {
        render(<ChildrenTable />);
        const editIcon = screen.getByTestId('edit_icon1');
        userEvent.click(editIcon);
        const closeIcon = screen.getByTestId('close_icon');
        const editModal = screen.getByText(/save changes/i);
        userEvent.click(closeIcon);
        expect(editModal).not.toBeInTheDocument();
    })

    test("Delete button is clickable", () => {
        render(<ChildrenTable />)
        const deleteBtn = screen.getByTestId('delete_icon1');
        userEvent.click(deleteBtn);
    })

    test("Add Child button is opening add child modal", () => {
        render(<ChildrenTable />);
        const addChildBtn = screen.getByTestId('add_child');
        userEvent.click(addChildBtn);
        const addModal = screen.getByTestId('close_icon2');
        expect(addModal).toBeInTheDocument();
    })

    test("Inputs in add modal able to add", () => {
        render(<ChildrenTable />);
        const addChildBtn = screen.getByTestId('add_child');
        userEvent.click(addChildBtn);
        const addBtn = screen.getByTestId('add_btn');
        const testValue = 'test';
        const nameField = screen.getByTestId('name_field');
        const emailField = screen.getByTestId('email_field');
        const genderField = screen.getByTestId('gender_field');
        const birthdateField = screen.getByTestId('birthdate_field');
        fireEvent.change(nameField, { target: { defaultValue: testValue } });
        fireEvent.change(emailField, { target: { defaultValue: testValue } });
        fireEvent.change(genderField, { target: { defaultValue: testValue } });
        fireEvent.change(birthdateField, { target: { defaultValue: testValue } });
        userEvent.click(addBtn);
    })

    test("Close button is closing the modal", () => {
        render(<ChildrenTable />);
        const addChildBtn = screen.getByTestId('add_child');
        userEvent.click(addChildBtn);
        const addModal = screen.getByTestId('add_btn');
        const closeBtn = screen.getByTestId('close_icon2');
        userEvent.click(closeBtn);
        expect(addModal).not.toBeInTheDocument();
    })

})
