﻿/// <reference path="../appreferences.ts" />

module App {
    export class BodyEditController {
        'use strict';

        userBodies: BodyDictionary;
        isInEdit: boolean;
        editData: Body;

        static $inject = ["bodyStorageServ"];
        constructor(
            private bodyStorageServ: BodyStorageService
            ) {

            this.userBodies = bodyStorageServ.userBodies;
            this.isInEdit = false;
            this.editData = undefined;
        }

        exists(name: string): boolean {
            return this.bodyStorageServ.existsInStock(name) || this.bodyStorageServ.existsInUser(name);
        }

        add() {
            this.editData = new Body("", "", 0, 0, 0);
            this.isInEdit = true;
        }

        edit(name: string) {
            this.editData = this.bodyStorageServ.getBody(name);
            this.isInEdit = true;
        }

        remove(name: string) {
            this.isInEdit = false;
            this.bodyStorageServ.removeBody(name);
            this.bodyStorageServ.save();
        }

        save() {
            this.isInEdit = false;
            this.bodyStorageServ.setBody(this.editData.name, this.editData);
            this.bodyStorageServ.save();
        }

        cancel() {
            this.isInEdit = false;
        }
    }
}
