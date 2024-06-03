import React, { useState } from "react";
import { Container, VStack, HStack, Input, Textarea, Button, IconButton, Box, Text, Select } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddNote = () => {
    if (editIndex !== null) {
      const updatedNotes = notes.map((note, index) => (index === editIndex ? { title, content, category } : note));
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, { title, content, category }]);
    }
    setTitle("");
    setContent("");
    setCategory("");
  };

  const handleEditNote = (index) => {
    setEditIndex(index);
    setTitle(notes[index].title);
    setContent(notes[index].content);
    setCategory(notes[index].category);
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const filteredNotes = notes.filter((note) => note.title.includes(search) || note.content.includes(search) || note.category.includes(search));

  return (
    <Container centerContent maxW="container.md" py={4}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Search notes..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <IconButton aria-label="Search" icon={<FaSearch />} />
        </HStack>
        <HStack width="100%">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Select placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </Select>
        </HStack>
        <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddNote}>
          {editIndex !== null ? "Update Note" : "Add Note"}
        </Button>
        <VStack spacing={4} width="100%">
          {filteredNotes.map((note, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <HStack justifyContent="space-between">
                <Text fontSize="xl">{note.title}</Text>
                <HStack>
                  <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditNote(index)} />
                  <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeleteNote(index)} />
                </HStack>
              </HStack>
              <Text>{note.content}</Text>
              <Text fontSize="sm" color="gray.500">
                {note.category}
              </Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
