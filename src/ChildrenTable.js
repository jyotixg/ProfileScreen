import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import MDInput from 'components/MDInput';
import childData from './ChildData';
// import MDTypography from 'components/MDTypography';
import { TextField, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ChildrenTable = () => {
    const [addChild, setAddChild] = useState({ name: "", email: "", gender: "", birthdate: "" })
    const [children, setchildren] = useState(childData);
    // console.log(children, "children");
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddChildModal, setOpenAddChildModal] = useState(false);
    const [modalData, setModalData] = useState({
        name: "",
        gender: "",
        email: "",
        birthdate: ""
    })

    const handleOpenAddChildModal = () => setOpenAddChildModal(true);
    const handleCloseAddChildModal = () => setOpenAddChildModal(false);
    const editModalClose = () => setOpenEditModal(false);

    const editModalOpen = (child) => {
        setOpenEditModal(true);
        setModalData(child);
    }

    const changehandler = (e) => {
        setModalData({ ...modalData, [e.target.name]: e.target.value })
    }

    const editHandler = (data) => {
        setOpenEditModal(false);
        for (let i = 0; i < children.length; i++) {
            if (children[i].id == data.id) {
                children[i] = data;
            }
        }
    };

    const deleteHandler = (childId) => {
        if (window.confirm("Are you sure you want to delete this child ?")) {
            const newChildData = children.filter((child) => {
                return child.id !== childId;
            })
            setchildren(newChildData);
        }
    }

    const onChangeAddChildHandler = (e) => {
        setAddChild({ ...addChild, [e.target.name]: e.target.value });
    }

    const addChildSubmitHandler = (e) => {
        e.preventDefault();
        addChild.status = "Inactive";
        addChild.id = children.length + 1;
        setchildren((prev) => [...prev, addChild]);
        setOpenAddChildModal(false);
        setAddChild("");
    }

    return (
        <>
            <Typography variant="p" fontSize={15} mb={1} ><b>Children:</b></Typography>

            <TableContainer component={Paper} style={{ border: "1px solid #ebe2e2a1", width: "700px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">Birthdate</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children.map((child, index) => (
                            <TableRow
                                key={child.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{child.name}</TableCell>
                                <TableCell align="left">{child.email}</TableCell>
                                <TableCell align="left">{child.gender}</TableCell>
                                <TableCell align="left">{child.birthdate}</TableCell>
                                <TableCell align="left">{child.status}</TableCell>
                                <TableCell align="center" >
                                    <EditIcon data-testid={`edit_icon${index}`} onClick={(event) => editModalOpen(child, event)}
                                        style={{ marginLeft: "10px", cursor: "pointer", color: "#0AB2D6" }}
                                    />
                                    <DeleteIcon data-testid={`delete_icon${index}`} onClick={() => deleteHandler(child.id)}
                                        style={{ marginLeft: "20px", cursor: "pointer", color: "red" }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                data-testid="add_child"
                onClick={handleOpenAddChildModal}
                variant="contained"
                style={{ color: "white", background: "#F6821E", margin: "10px auto 10px 0" }}
            >
                Add Child
            </Button>

            <Modal
                open={openEditModal}
                onClose={editModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CloseIcon fontSize='medium'
                        data-testid="close_icon"
                        onClick={() => setOpenEditModal(false)}
                        style={{
                            color: "red", display: "block",
                            marginLeft: "auto", cursor: "pointer"
                        }} />

                    <Typography variant="h6" mb={1}>Name:
                        <Input
                            data-testid="name_field"
                            value={modalData.name}
                            rows="1"
                            name="name"
                            type="text"
                            onChange={changehandler}
                            multiline
                            fullWidth
                        />
                    </Typography>
                    <Typography variant="h6" mb={1}>Gender:
                        <Input
                            data-testid="gender_field"
                            value={modalData.gender}
                            rows="1"
                            name="gender"
                            type="text"
                            onChange={changehandler}
                            multiline
                            fullWidth
                        />
                    </Typography>
                    <Typography variant="h6" mb={1}>Birthdate:</Typography>
                    <TextField
                        data-testid="birthdate_field"
                        type="date"
                        name="birthdate"
                        onChange={changehandler}
                        value={modalData.birthdate}
                        style={{ display: "block" }}
                    />
                    <Button
                        data-testid="save_btn"
                        onClick={() => editHandler(modalData)}
                        style={{
                            marginTop: "15px", color: "white", background: "#0AB2D6",
                        }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Modal>

            <Modal
                open={openAddChildModal}
                onClose={handleCloseAddChildModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={addChildSubmitHandler} >
                    <Box sx={style}>
                        <CloseIcon
                            data-testid="close_icon2"
                            fontSize='medium'
                            onClick={handleCloseAddChildModal}
                            style={{ color: "red", display: "block", marginLeft: "auto", cursor: "pointer" }} 
                            />

                        <Typography variant="h6" textAlign="left" mb={2}>Name:
                            <Input
                                data-testid="name_field"
                                value={addChild.name}
                                rows="1"
                                name="name"
                                type="text"
                                onChange={onChangeAddChildHandler}
                                multiline
                                fullWidth
                                required
                            />
                        </Typography>
                        <Typography variant="h6" textAlign="left" mb={2}>Email:
                            <Input
                                data-testid="email_field"
                                value={addChild.email}
                                rows="1"
                                name="email"
                                type="email"
                                onChange={onChangeAddChildHandler}
                                multiline
                                fullWidth
                                required
                            />
                        </Typography>
                        <Typography variant="h6" textAlign="left" mb={2}>Gender:
                            <Input
                                data-testid="gender_field"
                                value={addChild.gender}
                                rows="1"
                                name="gender"
                                type="text"
                                onChange={onChangeAddChildHandler}
                                multiline
                                fullWidth
                                required
                            />
                        </Typography>
                        <Typography variant="h6" mb={1}>Birthdate:</Typography>
                        <TextField
                            data-testid="birthdate_field"
                            type="date"
                            name="birthdate"
                            onChange={onChangeAddChildHandler}
                            value={addChild.birthdate}
                            required
                            style={{ display: "block" }}
                        />
                        <Button
                            data-testid="add_btn" 
                            type="submit"
                            style={{
                                color: "white", background: "#0AB2D6", marginTop: "15px"
                            }} 
                            >
                            Add
                        </Button>
                    </Box>
                </form>
            </Modal>
        </>
    );
}

export default ChildrenTable;