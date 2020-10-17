/* eslint-disable node/no-missing-require */
const router = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAllByBoardId(req.params.boardId);
  res.json(tasks);
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.add({
    ...req.body,
    boardId: req.params.boardId
  });
  res.json(task);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  return task ? res.json(task) : res.status(404).json('task not found');
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.upd(req.params.id, req.body);
  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  const isDeleted = await tasksService.del(req.params.id);
  return res.status(isDeleted ? 204 : 404).send();
});

module.exports = router;

const tasksRepo = require('./tasks.memory.repository');
const Task = require('./tasks.model');

const getAllByBoardId = boardId => tasksRepo.getAllByBoardId(boardId);

const getById = id => tasksRepo.getById(id);

const add = task => tasksRepo.add(new Task(task));

const upd = (id, task) => tasksRepo.upd(id, task);

const del = id => tasksRepo.del(id);

module.exports = { getAllByBoardId, getById, add, upd, del };

const db = {
  Users: [],
  Boards: [],
  Tasks: []
};

module.exports = {
  getAll(table) {
    return db[table];
  },

  getById(table, id) {
    return db[table].find(el => el.id === id);
  },

  getAllByProp(table, prop, propValue) {
    return db[table].filter(el => el[prop] === propValue);
  },

  getIndexById(table, id) {
    return db[table].findIndex(el => el.id === id);
  },

  add(table, item) {
    db[table].push(item);
    return this.getById(table, item.id);
  },

  upd(table, id, updatedItem) {
    const item = this.getById(table, id);
    Object.assign(item, updatedItem);
    return item;
  },

  del(table, id) {
    const itemIdx = this.getIndexById(table, id);
    if (itemIdx === -1) return false;
    db[table].splice(itemIdx, 1);
    return true;
  }
};
