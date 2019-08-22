import models from '../models';
import { Query, model } from 'mongoose';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Categoria.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error)
        }
    },
    query: async (req, res, next) => {
        try {
            const reg = await models.Categoria.findOne({ _id: req.query._id });
            if (!req) {
                res.status(404).send({
                    message: 'El Registro no existe'
                });
            }
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error)
        }
    },
    list: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Categoria.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'descripcion': new RegExp(valor, 'i') }] }, { createdAt: 0 })
                .sort({ 'createdAt': -1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({ _id: req.body._id }, { nombre: req.body.nombre, descripcion: req.body.descripcion });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error)
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.Categoria.findByIdAndRemove({ _id: req.body._id });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error !'
            });
            next(error)
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error)
        }
    },
    deactive: async (req, res, next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error)
        }
    }
}