/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const drones = $root.drones = (() => {

    /**
     * Namespace drones.
     * @exports drones
     * @namespace
     */
    const drones = {};

    drones.Action = (function() {

        /**
         * Properties of an Action.
         * @memberof drones
         * @interface IAction
         * @property {drones.IActionApplyForce|null} [applyForce] Action applyForce
         */

        /**
         * Constructs a new Action.
         * @memberof drones
         * @classdesc Represents an Action.
         * @implements IAction
         * @constructor
         * @param {drones.IAction=} [properties] Properties to set
         */
        function Action(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Action applyForce.
         * @member {drones.IActionApplyForce|null|undefined} applyForce
         * @memberof drones.Action
         * @instance
         */
        Action.prototype.applyForce = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Action action.
         * @member {"applyForce"|undefined} action
         * @memberof drones.Action
         * @instance
         */
        Object.defineProperty(Action.prototype, "action", {
            get: $util.oneOfGetter($oneOfFields = ["applyForce"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Action instance using the specified properties.
         * @function create
         * @memberof drones.Action
         * @static
         * @param {drones.IAction=} [properties] Properties to set
         * @returns {drones.Action} Action instance
         */
        Action.create = function create(properties) {
            return new Action(properties);
        };

        /**
         * Encodes the specified Action message. Does not implicitly {@link drones.Action.verify|verify} messages.
         * @function encode
         * @memberof drones.Action
         * @static
         * @param {drones.IAction} message Action message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Action.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.applyForce != null && Object.hasOwnProperty.call(message, "applyForce"))
                $root.drones.ActionApplyForce.encode(message.applyForce, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Action message, length delimited. Does not implicitly {@link drones.Action.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drones.Action
         * @static
         * @param {drones.IAction} message Action message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Action.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Action message from the specified reader or buffer.
         * @function decode
         * @memberof drones.Action
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drones.Action} Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Action.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.drones.Action();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.applyForce = $root.drones.ActionApplyForce.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Action message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drones.Action
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drones.Action} Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Action.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Action message.
         * @function verify
         * @memberof drones.Action
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Action.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.applyForce != null && message.hasOwnProperty("applyForce")) {
                properties.action = 1;
                {
                    let error = $root.drones.ActionApplyForce.verify(message.applyForce);
                    if (error)
                        return "applyForce." + error;
                }
            }
            return null;
        };

        /**
         * Creates an Action message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drones.Action
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drones.Action} Action
         */
        Action.fromObject = function fromObject(object) {
            if (object instanceof $root.drones.Action)
                return object;
            let message = new $root.drones.Action();
            if (object.applyForce != null) {
                if (typeof object.applyForce !== "object")
                    throw TypeError(".drones.Action.applyForce: object expected");
                message.applyForce = $root.drones.ActionApplyForce.fromObject(object.applyForce);
            }
            return message;
        };

        /**
         * Creates a plain object from an Action message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drones.Action
         * @static
         * @param {drones.Action} message Action
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Action.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.applyForce != null && message.hasOwnProperty("applyForce")) {
                object.applyForce = $root.drones.ActionApplyForce.toObject(message.applyForce, options);
                if (options.oneofs)
                    object.action = "applyForce";
            }
            return object;
        };

        /**
         * Converts this Action to JSON.
         * @function toJSON
         * @memberof drones.Action
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Action.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Action;
    })();

    drones.ActionApplyForce = (function() {

        /**
         * Properties of an ActionApplyForce.
         * @memberof drones
         * @interface IActionApplyForce
         * @property {number|null} [x] ActionApplyForce x
         * @property {number|null} [y] ActionApplyForce y
         * @property {number|null} [torque] ActionApplyForce torque
         */

        /**
         * Constructs a new ActionApplyForce.
         * @memberof drones
         * @classdesc Represents an ActionApplyForce.
         * @implements IActionApplyForce
         * @constructor
         * @param {drones.IActionApplyForce=} [properties] Properties to set
         */
        function ActionApplyForce(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ActionApplyForce x.
         * @member {number} x
         * @memberof drones.ActionApplyForce
         * @instance
         */
        ActionApplyForce.prototype.x = 0;

        /**
         * ActionApplyForce y.
         * @member {number} y
         * @memberof drones.ActionApplyForce
         * @instance
         */
        ActionApplyForce.prototype.y = 0;

        /**
         * ActionApplyForce torque.
         * @member {number} torque
         * @memberof drones.ActionApplyForce
         * @instance
         */
        ActionApplyForce.prototype.torque = 0;

        /**
         * Creates a new ActionApplyForce instance using the specified properties.
         * @function create
         * @memberof drones.ActionApplyForce
         * @static
         * @param {drones.IActionApplyForce=} [properties] Properties to set
         * @returns {drones.ActionApplyForce} ActionApplyForce instance
         */
        ActionApplyForce.create = function create(properties) {
            return new ActionApplyForce(properties);
        };

        /**
         * Encodes the specified ActionApplyForce message. Does not implicitly {@link drones.ActionApplyForce.verify|verify} messages.
         * @function encode
         * @memberof drones.ActionApplyForce
         * @static
         * @param {drones.IActionApplyForce} message ActionApplyForce message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActionApplyForce.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.torque != null && Object.hasOwnProperty.call(message, "torque"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.torque);
            return writer;
        };

        /**
         * Encodes the specified ActionApplyForce message, length delimited. Does not implicitly {@link drones.ActionApplyForce.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drones.ActionApplyForce
         * @static
         * @param {drones.IActionApplyForce} message ActionApplyForce message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActionApplyForce.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ActionApplyForce message from the specified reader or buffer.
         * @function decode
         * @memberof drones.ActionApplyForce
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drones.ActionApplyForce} ActionApplyForce
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActionApplyForce.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.drones.ActionApplyForce();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.x = reader.float();
                    break;
                case 2:
                    message.y = reader.float();
                    break;
                case 3:
                    message.torque = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ActionApplyForce message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drones.ActionApplyForce
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drones.ActionApplyForce} ActionApplyForce
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActionApplyForce.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ActionApplyForce message.
         * @function verify
         * @memberof drones.ActionApplyForce
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ActionApplyForce.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.torque != null && message.hasOwnProperty("torque"))
                if (typeof message.torque !== "number")
                    return "torque: number expected";
            return null;
        };

        /**
         * Creates an ActionApplyForce message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drones.ActionApplyForce
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drones.ActionApplyForce} ActionApplyForce
         */
        ActionApplyForce.fromObject = function fromObject(object) {
            if (object instanceof $root.drones.ActionApplyForce)
                return object;
            let message = new $root.drones.ActionApplyForce();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.torque != null)
                message.torque = Number(object.torque);
            return message;
        };

        /**
         * Creates a plain object from an ActionApplyForce message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drones.ActionApplyForce
         * @static
         * @param {drones.ActionApplyForce} message ActionApplyForce
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActionApplyForce.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.torque = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.torque != null && message.hasOwnProperty("torque"))
                object.torque = options.json && !isFinite(message.torque) ? String(message.torque) : message.torque;
            return object;
        };

        /**
         * Converts this ActionApplyForce to JSON.
         * @function toJSON
         * @memberof drones.ActionApplyForce
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ActionApplyForce.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ActionApplyForce;
    })();

    drones.Options = (function() {

        /**
         * Properties of an Options.
         * @memberof drones
         * @interface IOptions
         * @property {drones.Options.IMaze|null} [maze] Options maze
         * @property {number|null} [cellSize] Options cellSize
         * @property {drones.Options.IDrone|null} [drone] Options drone
         * @property {number|null} [maxTicks] Options maxTicks
         */

        /**
         * Constructs a new Options.
         * @memberof drones
         * @classdesc Represents an Options.
         * @implements IOptions
         * @constructor
         * @param {drones.IOptions=} [properties] Properties to set
         */
        function Options(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Options maze.
         * @member {drones.Options.IMaze|null|undefined} maze
         * @memberof drones.Options
         * @instance
         */
        Options.prototype.maze = null;

        /**
         * Options cellSize.
         * @member {number} cellSize
         * @memberof drones.Options
         * @instance
         */
        Options.prototype.cellSize = 0;

        /**
         * Options drone.
         * @member {drones.Options.IDrone|null|undefined} drone
         * @memberof drones.Options
         * @instance
         */
        Options.prototype.drone = null;

        /**
         * Options maxTicks.
         * @member {number} maxTicks
         * @memberof drones.Options
         * @instance
         */
        Options.prototype.maxTicks = 0;

        /**
         * Creates a new Options instance using the specified properties.
         * @function create
         * @memberof drones.Options
         * @static
         * @param {drones.IOptions=} [properties] Properties to set
         * @returns {drones.Options} Options instance
         */
        Options.create = function create(properties) {
            return new Options(properties);
        };

        /**
         * Encodes the specified Options message. Does not implicitly {@link drones.Options.verify|verify} messages.
         * @function encode
         * @memberof drones.Options
         * @static
         * @param {drones.IOptions} message Options message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Options.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.maze != null && Object.hasOwnProperty.call(message, "maze"))
                $root.drones.Options.Maze.encode(message.maze, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.cellSize != null && Object.hasOwnProperty.call(message, "cellSize"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.cellSize);
            if (message.drone != null && Object.hasOwnProperty.call(message, "drone"))
                $root.drones.Options.Drone.encode(message.drone, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.maxTicks != null && Object.hasOwnProperty.call(message, "maxTicks"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.maxTicks);
            return writer;
        };

        /**
         * Encodes the specified Options message, length delimited. Does not implicitly {@link drones.Options.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drones.Options
         * @static
         * @param {drones.IOptions} message Options message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Options.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Options message from the specified reader or buffer.
         * @function decode
         * @memberof drones.Options
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drones.Options} Options
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Options.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.drones.Options();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.maze = $root.drones.Options.Maze.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.cellSize = reader.uint32();
                    break;
                case 3:
                    message.drone = $root.drones.Options.Drone.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.maxTicks = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Options message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drones.Options
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drones.Options} Options
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Options.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Options message.
         * @function verify
         * @memberof drones.Options
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Options.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.maze != null && message.hasOwnProperty("maze")) {
                let error = $root.drones.Options.Maze.verify(message.maze);
                if (error)
                    return "maze." + error;
            }
            if (message.cellSize != null && message.hasOwnProperty("cellSize"))
                if (!$util.isInteger(message.cellSize))
                    return "cellSize: integer expected";
            if (message.drone != null && message.hasOwnProperty("drone")) {
                let error = $root.drones.Options.Drone.verify(message.drone);
                if (error)
                    return "drone." + error;
            }
            if (message.maxTicks != null && message.hasOwnProperty("maxTicks"))
                if (!$util.isInteger(message.maxTicks))
                    return "maxTicks: integer expected";
            return null;
        };

        /**
         * Creates an Options message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drones.Options
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drones.Options} Options
         */
        Options.fromObject = function fromObject(object) {
            if (object instanceof $root.drones.Options)
                return object;
            let message = new $root.drones.Options();
            if (object.maze != null) {
                if (typeof object.maze !== "object")
                    throw TypeError(".drones.Options.maze: object expected");
                message.maze = $root.drones.Options.Maze.fromObject(object.maze);
            }
            if (object.cellSize != null)
                message.cellSize = object.cellSize >>> 0;
            if (object.drone != null) {
                if (typeof object.drone !== "object")
                    throw TypeError(".drones.Options.drone: object expected");
                message.drone = $root.drones.Options.Drone.fromObject(object.drone);
            }
            if (object.maxTicks != null)
                message.maxTicks = object.maxTicks >>> 0;
            return message;
        };

        /**
         * Creates a plain object from an Options message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drones.Options
         * @static
         * @param {drones.Options} message Options
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Options.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.maze = null;
                object.cellSize = 0;
                object.drone = null;
                object.maxTicks = 0;
            }
            if (message.maze != null && message.hasOwnProperty("maze"))
                object.maze = $root.drones.Options.Maze.toObject(message.maze, options);
            if (message.cellSize != null && message.hasOwnProperty("cellSize"))
                object.cellSize = message.cellSize;
            if (message.drone != null && message.hasOwnProperty("drone"))
                object.drone = $root.drones.Options.Drone.toObject(message.drone, options);
            if (message.maxTicks != null && message.hasOwnProperty("maxTicks"))
                object.maxTicks = message.maxTicks;
            return object;
        };

        /**
         * Converts this Options to JSON.
         * @function toJSON
         * @memberof drones.Options
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Options.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        Options.CellPos = (function() {

            /**
             * Properties of a CellPos.
             * @memberof drones.Options
             * @interface ICellPos
             * @property {number|null} [x] CellPos x
             * @property {number|null} [y] CellPos y
             */

            /**
             * Constructs a new CellPos.
             * @memberof drones.Options
             * @classdesc Represents a CellPos.
             * @implements ICellPos
             * @constructor
             * @param {drones.Options.ICellPos=} [properties] Properties to set
             */
            function CellPos(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CellPos x.
             * @member {number} x
             * @memberof drones.Options.CellPos
             * @instance
             */
            CellPos.prototype.x = 0;

            /**
             * CellPos y.
             * @member {number} y
             * @memberof drones.Options.CellPos
             * @instance
             */
            CellPos.prototype.y = 0;

            /**
             * Creates a new CellPos instance using the specified properties.
             * @function create
             * @memberof drones.Options.CellPos
             * @static
             * @param {drones.Options.ICellPos=} [properties] Properties to set
             * @returns {drones.Options.CellPos} CellPos instance
             */
            CellPos.create = function create(properties) {
                return new CellPos(properties);
            };

            /**
             * Encodes the specified CellPos message. Does not implicitly {@link drones.Options.CellPos.verify|verify} messages.
             * @function encode
             * @memberof drones.Options.CellPos
             * @static
             * @param {drones.Options.ICellPos} message CellPos message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CellPos.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.x);
                if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.y);
                return writer;
            };

            /**
             * Encodes the specified CellPos message, length delimited. Does not implicitly {@link drones.Options.CellPos.verify|verify} messages.
             * @function encodeDelimited
             * @memberof drones.Options.CellPos
             * @static
             * @param {drones.Options.ICellPos} message CellPos message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CellPos.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CellPos message from the specified reader or buffer.
             * @function decode
             * @memberof drones.Options.CellPos
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {drones.Options.CellPos} CellPos
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CellPos.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.drones.Options.CellPos();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.x = reader.uint32();
                        break;
                    case 2:
                        message.y = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CellPos message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof drones.Options.CellPos
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {drones.Options.CellPos} CellPos
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CellPos.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CellPos message.
             * @function verify
             * @memberof drones.Options.CellPos
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CellPos.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.x != null && message.hasOwnProperty("x"))
                    if (!$util.isInteger(message.x))
                        return "x: integer expected";
                if (message.y != null && message.hasOwnProperty("y"))
                    if (!$util.isInteger(message.y))
                        return "y: integer expected";
                return null;
            };

            /**
             * Creates a CellPos message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof drones.Options.CellPos
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {drones.Options.CellPos} CellPos
             */
            CellPos.fromObject = function fromObject(object) {
                if (object instanceof $root.drones.Options.CellPos)
                    return object;
                let message = new $root.drones.Options.CellPos();
                if (object.x != null)
                    message.x = object.x >>> 0;
                if (object.y != null)
                    message.y = object.y >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a CellPos message. Also converts values to other types if specified.
             * @function toObject
             * @memberof drones.Options.CellPos
             * @static
             * @param {drones.Options.CellPos} message CellPos
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CellPos.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.x = 0;
                    object.y = 0;
                }
                if (message.x != null && message.hasOwnProperty("x"))
                    object.x = message.x;
                if (message.y != null && message.hasOwnProperty("y"))
                    object.y = message.y;
                return object;
            };

            /**
             * Converts this CellPos to JSON.
             * @function toJSON
             * @memberof drones.Options.CellPos
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CellPos.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CellPos;
        })();

        Options.Maze = (function() {

            /**
             * Properties of a Maze.
             * @memberof drones.Options
             * @interface IMaze
             * @property {number|null} [width] Maze width
             * @property {number|null} [height] Maze height
             * @property {Uint8Array|null} [walls] Maze walls
             * @property {Array.<drones.Options.ICellPos>|null} [checkpoints] Maze checkpoints
             */

            /**
             * Constructs a new Maze.
             * @memberof drones.Options
             * @classdesc Represents a Maze.
             * @implements IMaze
             * @constructor
             * @param {drones.Options.IMaze=} [properties] Properties to set
             */
            function Maze(properties) {
                this.checkpoints = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Maze width.
             * @member {number} width
             * @memberof drones.Options.Maze
             * @instance
             */
            Maze.prototype.width = 0;

            /**
             * Maze height.
             * @member {number} height
             * @memberof drones.Options.Maze
             * @instance
             */
            Maze.prototype.height = 0;

            /**
             * Maze walls.
             * @member {Uint8Array} walls
             * @memberof drones.Options.Maze
             * @instance
             */
            Maze.prototype.walls = $util.newBuffer([]);

            /**
             * Maze checkpoints.
             * @member {Array.<drones.Options.ICellPos>} checkpoints
             * @memberof drones.Options.Maze
             * @instance
             */
            Maze.prototype.checkpoints = $util.emptyArray;

            /**
             * Creates a new Maze instance using the specified properties.
             * @function create
             * @memberof drones.Options.Maze
             * @static
             * @param {drones.Options.IMaze=} [properties] Properties to set
             * @returns {drones.Options.Maze} Maze instance
             */
            Maze.create = function create(properties) {
                return new Maze(properties);
            };

            /**
             * Encodes the specified Maze message. Does not implicitly {@link drones.Options.Maze.verify|verify} messages.
             * @function encode
             * @memberof drones.Options.Maze
             * @static
             * @param {drones.Options.IMaze} message Maze message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Maze.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.width);
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.height);
                if (message.walls != null && Object.hasOwnProperty.call(message, "walls"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.walls);
                if (message.checkpoints != null && message.checkpoints.length)
                    for (let i = 0; i < message.checkpoints.length; ++i)
                        $root.drones.Options.CellPos.encode(message.checkpoints[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Maze message, length delimited. Does not implicitly {@link drones.Options.Maze.verify|verify} messages.
             * @function encodeDelimited
             * @memberof drones.Options.Maze
             * @static
             * @param {drones.Options.IMaze} message Maze message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Maze.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Maze message from the specified reader or buffer.
             * @function decode
             * @memberof drones.Options.Maze
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {drones.Options.Maze} Maze
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Maze.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.drones.Options.Maze();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.width = reader.uint32();
                        break;
                    case 2:
                        message.height = reader.uint32();
                        break;
                    case 3:
                        message.walls = reader.bytes();
                        break;
                    case 4:
                        if (!(message.checkpoints && message.checkpoints.length))
                            message.checkpoints = [];
                        message.checkpoints.push($root.drones.Options.CellPos.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Maze message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof drones.Options.Maze
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {drones.Options.Maze} Maze
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Maze.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Maze message.
             * @function verify
             * @memberof drones.Options.Maze
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Maze.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.width != null && message.hasOwnProperty("width"))
                    if (!$util.isInteger(message.width))
                        return "width: integer expected";
                if (message.height != null && message.hasOwnProperty("height"))
                    if (!$util.isInteger(message.height))
                        return "height: integer expected";
                if (message.walls != null && message.hasOwnProperty("walls"))
                    if (!(message.walls && typeof message.walls.length === "number" || $util.isString(message.walls)))
                        return "walls: buffer expected";
                if (message.checkpoints != null && message.hasOwnProperty("checkpoints")) {
                    if (!Array.isArray(message.checkpoints))
                        return "checkpoints: array expected";
                    for (let i = 0; i < message.checkpoints.length; ++i) {
                        let error = $root.drones.Options.CellPos.verify(message.checkpoints[i]);
                        if (error)
                            return "checkpoints." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Maze message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof drones.Options.Maze
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {drones.Options.Maze} Maze
             */
            Maze.fromObject = function fromObject(object) {
                if (object instanceof $root.drones.Options.Maze)
                    return object;
                let message = new $root.drones.Options.Maze();
                if (object.width != null)
                    message.width = object.width >>> 0;
                if (object.height != null)
                    message.height = object.height >>> 0;
                if (object.walls != null)
                    if (typeof object.walls === "string")
                        $util.base64.decode(object.walls, message.walls = $util.newBuffer($util.base64.length(object.walls)), 0);
                    else if (object.walls.length)
                        message.walls = object.walls;
                if (object.checkpoints) {
                    if (!Array.isArray(object.checkpoints))
                        throw TypeError(".drones.Options.Maze.checkpoints: array expected");
                    message.checkpoints = [];
                    for (let i = 0; i < object.checkpoints.length; ++i) {
                        if (typeof object.checkpoints[i] !== "object")
                            throw TypeError(".drones.Options.Maze.checkpoints: object expected");
                        message.checkpoints[i] = $root.drones.Options.CellPos.fromObject(object.checkpoints[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Maze message. Also converts values to other types if specified.
             * @function toObject
             * @memberof drones.Options.Maze
             * @static
             * @param {drones.Options.Maze} message Maze
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Maze.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.checkpoints = [];
                if (options.defaults) {
                    object.width = 0;
                    object.height = 0;
                    if (options.bytes === String)
                        object.walls = "";
                    else {
                        object.walls = [];
                        if (options.bytes !== Array)
                            object.walls = $util.newBuffer(object.walls);
                    }
                }
                if (message.width != null && message.hasOwnProperty("width"))
                    object.width = message.width;
                if (message.height != null && message.hasOwnProperty("height"))
                    object.height = message.height;
                if (message.walls != null && message.hasOwnProperty("walls"))
                    object.walls = options.bytes === String ? $util.base64.encode(message.walls, 0, message.walls.length) : options.bytes === Array ? Array.prototype.slice.call(message.walls) : message.walls;
                if (message.checkpoints && message.checkpoints.length) {
                    object.checkpoints = [];
                    for (let j = 0; j < message.checkpoints.length; ++j)
                        object.checkpoints[j] = $root.drones.Options.CellPos.toObject(message.checkpoints[j], options);
                }
                return object;
            };

            /**
             * Converts this Maze to JSON.
             * @function toJSON
             * @memberof drones.Options.Maze
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Maze.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Maze;
        })();

        Options.Drone = (function() {

            /**
             * Properties of a Drone.
             * @memberof drones.Options
             * @interface IDrone
             * @property {number|null} [width] Drone width
             * @property {number|null} [height] Drone height
             * @property {number|null} [weight] Drone weight
             * @property {number|null} [maxForce] Drone maxForce
             * @property {number|null} [maxTorque] Drone maxTorque
             */

            /**
             * Constructs a new Drone.
             * @memberof drones.Options
             * @classdesc Represents a Drone.
             * @implements IDrone
             * @constructor
             * @param {drones.Options.IDrone=} [properties] Properties to set
             */
            function Drone(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Drone width.
             * @member {number} width
             * @memberof drones.Options.Drone
             * @instance
             */
            Drone.prototype.width = 0;

            /**
             * Drone height.
             * @member {number} height
             * @memberof drones.Options.Drone
             * @instance
             */
            Drone.prototype.height = 0;

            /**
             * Drone weight.
             * @member {number} weight
             * @memberof drones.Options.Drone
             * @instance
             */
            Drone.prototype.weight = 0;

            /**
             * Drone maxForce.
             * @member {number} maxForce
             * @memberof drones.Options.Drone
             * @instance
             */
            Drone.prototype.maxForce = 0;

            /**
             * Drone maxTorque.
             * @member {number} maxTorque
             * @memberof drones.Options.Drone
             * @instance
             */
            Drone.prototype.maxTorque = 0;

            /**
             * Creates a new Drone instance using the specified properties.
             * @function create
             * @memberof drones.Options.Drone
             * @static
             * @param {drones.Options.IDrone=} [properties] Properties to set
             * @returns {drones.Options.Drone} Drone instance
             */
            Drone.create = function create(properties) {
                return new Drone(properties);
            };

            /**
             * Encodes the specified Drone message. Does not implicitly {@link drones.Options.Drone.verify|verify} messages.
             * @function encode
             * @memberof drones.Options.Drone
             * @static
             * @param {drones.Options.IDrone} message Drone message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Drone.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                    writer.uint32(/* id 1, wireType 5 =*/13).float(message.width);
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    writer.uint32(/* id 2, wireType 5 =*/21).float(message.height);
                if (message.weight != null && Object.hasOwnProperty.call(message, "weight"))
                    writer.uint32(/* id 3, wireType 5 =*/29).float(message.weight);
                if (message.maxForce != null && Object.hasOwnProperty.call(message, "maxForce"))
                    writer.uint32(/* id 4, wireType 5 =*/37).float(message.maxForce);
                if (message.maxTorque != null && Object.hasOwnProperty.call(message, "maxTorque"))
                    writer.uint32(/* id 5, wireType 5 =*/45).float(message.maxTorque);
                return writer;
            };

            /**
             * Encodes the specified Drone message, length delimited. Does not implicitly {@link drones.Options.Drone.verify|verify} messages.
             * @function encodeDelimited
             * @memberof drones.Options.Drone
             * @static
             * @param {drones.Options.IDrone} message Drone message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Drone.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Drone message from the specified reader or buffer.
             * @function decode
             * @memberof drones.Options.Drone
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {drones.Options.Drone} Drone
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Drone.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.drones.Options.Drone();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.width = reader.float();
                        break;
                    case 2:
                        message.height = reader.float();
                        break;
                    case 3:
                        message.weight = reader.float();
                        break;
                    case 4:
                        message.maxForce = reader.float();
                        break;
                    case 5:
                        message.maxTorque = reader.float();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Drone message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof drones.Options.Drone
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {drones.Options.Drone} Drone
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Drone.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Drone message.
             * @function verify
             * @memberof drones.Options.Drone
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Drone.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.width != null && message.hasOwnProperty("width"))
                    if (typeof message.width !== "number")
                        return "width: number expected";
                if (message.height != null && message.hasOwnProperty("height"))
                    if (typeof message.height !== "number")
                        return "height: number expected";
                if (message.weight != null && message.hasOwnProperty("weight"))
                    if (typeof message.weight !== "number")
                        return "weight: number expected";
                if (message.maxForce != null && message.hasOwnProperty("maxForce"))
                    if (typeof message.maxForce !== "number")
                        return "maxForce: number expected";
                if (message.maxTorque != null && message.hasOwnProperty("maxTorque"))
                    if (typeof message.maxTorque !== "number")
                        return "maxTorque: number expected";
                return null;
            };

            /**
             * Creates a Drone message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof drones.Options.Drone
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {drones.Options.Drone} Drone
             */
            Drone.fromObject = function fromObject(object) {
                if (object instanceof $root.drones.Options.Drone)
                    return object;
                let message = new $root.drones.Options.Drone();
                if (object.width != null)
                    message.width = Number(object.width);
                if (object.height != null)
                    message.height = Number(object.height);
                if (object.weight != null)
                    message.weight = Number(object.weight);
                if (object.maxForce != null)
                    message.maxForce = Number(object.maxForce);
                if (object.maxTorque != null)
                    message.maxTorque = Number(object.maxTorque);
                return message;
            };

            /**
             * Creates a plain object from a Drone message. Also converts values to other types if specified.
             * @function toObject
             * @memberof drones.Options.Drone
             * @static
             * @param {drones.Options.Drone} message Drone
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Drone.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.width = 0;
                    object.height = 0;
                    object.weight = 0;
                    object.maxForce = 0;
                    object.maxTorque = 0;
                }
                if (message.width != null && message.hasOwnProperty("width"))
                    object.width = options.json && !isFinite(message.width) ? String(message.width) : message.width;
                if (message.height != null && message.hasOwnProperty("height"))
                    object.height = options.json && !isFinite(message.height) ? String(message.height) : message.height;
                if (message.weight != null && message.hasOwnProperty("weight"))
                    object.weight = options.json && !isFinite(message.weight) ? String(message.weight) : message.weight;
                if (message.maxForce != null && message.hasOwnProperty("maxForce"))
                    object.maxForce = options.json && !isFinite(message.maxForce) ? String(message.maxForce) : message.maxForce;
                if (message.maxTorque != null && message.hasOwnProperty("maxTorque"))
                    object.maxTorque = options.json && !isFinite(message.maxTorque) ? String(message.maxTorque) : message.maxTorque;
                return object;
            };

            /**
             * Converts this Drone to JSON.
             * @function toJSON
             * @memberof drones.Options.Drone
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Drone.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Drone;
        })();

        return Options;
    })();

    drones.State = (function() {

        /**
         * Properties of a State.
         * @memberof drones
         * @interface IState
         * @property {Array.<drones.IPlayer>|null} [players] State players
         */

        /**
         * Constructs a new State.
         * @memberof drones
         * @classdesc Represents a State.
         * @implements IState
         * @constructor
         * @param {drones.IState=} [properties] Properties to set
         */
        function State(properties) {
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * State players.
         * @member {Array.<drones.IPlayer>} players
         * @memberof drones.State
         * @instance
         */
        State.prototype.players = $util.emptyArray;

        /**
         * Creates a new State instance using the specified properties.
         * @function create
         * @memberof drones.State
         * @static
         * @param {drones.IState=} [properties] Properties to set
         * @returns {drones.State} State instance
         */
        State.create = function create(properties) {
            return new State(properties);
        };

        /**
         * Encodes the specified State message. Does not implicitly {@link drones.State.verify|verify} messages.
         * @function encode
         * @memberof drones.State
         * @static
         * @param {drones.IState} message State message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        State.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.drones.Player.encode(message.players[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified State message, length delimited. Does not implicitly {@link drones.State.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drones.State
         * @static
         * @param {drones.IState} message State message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        State.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a State message from the specified reader or buffer.
         * @function decode
         * @memberof drones.State
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drones.State} State
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        State.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.drones.State();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.players && message.players.length))
                        message.players = [];
                    message.players.push($root.drones.Player.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a State message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drones.State
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drones.State} State
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        State.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a State message.
         * @function verify
         * @memberof drones.State
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        State.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i) {
                    let error = $root.drones.Player.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            return null;
        };

        /**
         * Creates a State message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drones.State
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drones.State} State
         */
        State.fromObject = function fromObject(object) {
            if (object instanceof $root.drones.State)
                return object;
            let message = new $root.drones.State();
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".drones.State.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".drones.State.players: object expected");
                    message.players[i] = $root.drones.Player.fromObject(object.players[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a State message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drones.State
         * @static
         * @param {drones.State} message State
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        State.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.drones.Player.toObject(message.players[j], options);
            }
            return object;
        };

        /**
         * Converts this State to JSON.
         * @function toJSON
         * @memberof drones.State
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        State.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return State;
    })();

    drones.Player = (function() {

        /**
         * Properties of a Player.
         * @memberof drones
         * @interface IPlayer
         * @property {drones.IDrone|null} [drone] Player drone
         */

        /**
         * Constructs a new Player.
         * @memberof drones
         * @classdesc Represents a Player.
         * @implements IPlayer
         * @constructor
         * @param {drones.IPlayer=} [properties] Properties to set
         */
        function Player(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Player drone.
         * @member {drones.IDrone|null|undefined} drone
         * @memberof drones.Player
         * @instance
         */
        Player.prototype.drone = null;

        /**
         * Creates a new Player instance using the specified properties.
         * @function create
         * @memberof drones.Player
         * @static
         * @param {drones.IPlayer=} [properties] Properties to set
         * @returns {drones.Player} Player instance
         */
        Player.create = function create(properties) {
            return new Player(properties);
        };

        /**
         * Encodes the specified Player message. Does not implicitly {@link drones.Player.verify|verify} messages.
         * @function encode
         * @memberof drones.Player
         * @static
         * @param {drones.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.drone != null && Object.hasOwnProperty.call(message, "drone"))
                $root.drones.Drone.encode(message.drone, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link drones.Player.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drones.Player
         * @static
         * @param {drones.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @function decode
         * @memberof drones.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drones.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.drones.Player();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.drone = $root.drones.Drone.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drones.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drones.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Player message.
         * @function verify
         * @memberof drones.Player
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Player.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.drone != null && message.hasOwnProperty("drone")) {
                let error = $root.drones.Drone.verify(message.drone);
                if (error)
                    return "drone." + error;
            }
            return null;
        };

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drones.Player
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drones.Player} Player
         */
        Player.fromObject = function fromObject(object) {
            if (object instanceof $root.drones.Player)
                return object;
            let message = new $root.drones.Player();
            if (object.drone != null) {
                if (typeof object.drone !== "object")
                    throw TypeError(".drones.Player.drone: object expected");
                message.drone = $root.drones.Drone.fromObject(object.drone);
            }
            return message;
        };

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drones.Player
         * @static
         * @param {drones.Player} message Player
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Player.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.drone = null;
            if (message.drone != null && message.hasOwnProperty("drone"))
                object.drone = $root.drones.Drone.toObject(message.drone, options);
            return object;
        };

        /**
         * Converts this Player to JSON.
         * @function toJSON
         * @memberof drones.Player
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Player.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Player;
    })();

    drones.Drone = (function() {

        /**
         * Properties of a Drone.
         * @memberof drones
         * @interface IDrone
         * @property {drones.IVec2|null} [pos] Drone pos
         * @property {number|null} [angle] Drone angle
         * @property {number|null} [nextCheckpoint] Drone nextCheckpoint
         */

        /**
         * Constructs a new Drone.
         * @memberof drones
         * @classdesc Represents a Drone.
         * @implements IDrone
         * @constructor
         * @param {drones.IDrone=} [properties] Properties to set
         */
        function Drone(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Drone pos.
         * @member {drones.IVec2|null|undefined} pos
         * @memberof drones.Drone
         * @instance
         */
        Drone.prototype.pos = null;

        /**
         * Drone angle.
         * @member {number} angle
         * @memberof drones.Drone
         * @instance
         */
        Drone.prototype.angle = 0;

        /**
         * Drone nextCheckpoint.
         * @member {number} nextCheckpoint
         * @memberof drones.Drone
         * @instance
         */
        Drone.prototype.nextCheckpoint = 0;

        /**
         * Creates a new Drone instance using the specified properties.
         * @function create
         * @memberof drones.Drone
         * @static
         * @param {drones.IDrone=} [properties] Properties to set
         * @returns {drones.Drone} Drone instance
         */
        Drone.create = function create(properties) {
            return new Drone(properties);
        };

        /**
         * Encodes the specified Drone message. Does not implicitly {@link drones.Drone.verify|verify} messages.
         * @function encode
         * @memberof drones.Drone
         * @static
         * @param {drones.IDrone} message Drone message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Drone.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pos != null && Object.hasOwnProperty.call(message, "pos"))
                $root.drones.Vec2.encode(message.pos, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.angle != null && Object.hasOwnProperty.call(message, "angle"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.angle);
            if (message.nextCheckpoint != null && Object.hasOwnProperty.call(message, "nextCheckpoint"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.nextCheckpoint);
            return writer;
        };

        /**
         * Encodes the specified Drone message, length delimited. Does not implicitly {@link drones.Drone.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drones.Drone
         * @static
         * @param {drones.IDrone} message Drone message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Drone.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Drone message from the specified reader or buffer.
         * @function decode
         * @memberof drones.Drone
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drones.Drone} Drone
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Drone.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.drones.Drone();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pos = $root.drones.Vec2.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.angle = reader.float();
                    break;
                case 3:
                    message.nextCheckpoint = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Drone message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drones.Drone
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drones.Drone} Drone
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Drone.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Drone message.
         * @function verify
         * @memberof drones.Drone
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Drone.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pos != null && message.hasOwnProperty("pos")) {
                let error = $root.drones.Vec2.verify(message.pos);
                if (error)
                    return "pos." + error;
            }
            if (message.angle != null && message.hasOwnProperty("angle"))
                if (typeof message.angle !== "number")
                    return "angle: number expected";
            if (message.nextCheckpoint != null && message.hasOwnProperty("nextCheckpoint"))
                if (!$util.isInteger(message.nextCheckpoint))
                    return "nextCheckpoint: integer expected";
            return null;
        };

        /**
         * Creates a Drone message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drones.Drone
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drones.Drone} Drone
         */
        Drone.fromObject = function fromObject(object) {
            if (object instanceof $root.drones.Drone)
                return object;
            let message = new $root.drones.Drone();
            if (object.pos != null) {
                if (typeof object.pos !== "object")
                    throw TypeError(".drones.Drone.pos: object expected");
                message.pos = $root.drones.Vec2.fromObject(object.pos);
            }
            if (object.angle != null)
                message.angle = Number(object.angle);
            if (object.nextCheckpoint != null)
                message.nextCheckpoint = object.nextCheckpoint | 0;
            return message;
        };

        /**
         * Creates a plain object from a Drone message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drones.Drone
         * @static
         * @param {drones.Drone} message Drone
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Drone.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.pos = null;
                object.angle = 0;
                object.nextCheckpoint = 0;
            }
            if (message.pos != null && message.hasOwnProperty("pos"))
                object.pos = $root.drones.Vec2.toObject(message.pos, options);
            if (message.angle != null && message.hasOwnProperty("angle"))
                object.angle = options.json && !isFinite(message.angle) ? String(message.angle) : message.angle;
            if (message.nextCheckpoint != null && message.hasOwnProperty("nextCheckpoint"))
                object.nextCheckpoint = message.nextCheckpoint;
            return object;
        };

        /**
         * Converts this Drone to JSON.
         * @function toJSON
         * @memberof drones.Drone
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Drone.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Drone;
    })();

    drones.Vec2 = (function() {

        /**
         * Properties of a Vec2.
         * @memberof drones
         * @interface IVec2
         * @property {number|null} [x] Vec2 x
         * @property {number|null} [y] Vec2 y
         */

        /**
         * Constructs a new Vec2.
         * @memberof drones
         * @classdesc Represents a Vec2.
         * @implements IVec2
         * @constructor
         * @param {drones.IVec2=} [properties] Properties to set
         */
        function Vec2(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Vec2 x.
         * @member {number} x
         * @memberof drones.Vec2
         * @instance
         */
        Vec2.prototype.x = 0;

        /**
         * Vec2 y.
         * @member {number} y
         * @memberof drones.Vec2
         * @instance
         */
        Vec2.prototype.y = 0;

        /**
         * Creates a new Vec2 instance using the specified properties.
         * @function create
         * @memberof drones.Vec2
         * @static
         * @param {drones.IVec2=} [properties] Properties to set
         * @returns {drones.Vec2} Vec2 instance
         */
        Vec2.create = function create(properties) {
            return new Vec2(properties);
        };

        /**
         * Encodes the specified Vec2 message. Does not implicitly {@link drones.Vec2.verify|verify} messages.
         * @function encode
         * @memberof drones.Vec2
         * @static
         * @param {drones.IVec2} message Vec2 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vec2.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            return writer;
        };

        /**
         * Encodes the specified Vec2 message, length delimited. Does not implicitly {@link drones.Vec2.verify|verify} messages.
         * @function encodeDelimited
         * @memberof drones.Vec2
         * @static
         * @param {drones.IVec2} message Vec2 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vec2.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Vec2 message from the specified reader or buffer.
         * @function decode
         * @memberof drones.Vec2
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {drones.Vec2} Vec2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vec2.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.drones.Vec2();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.x = reader.float();
                    break;
                case 2:
                    message.y = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Vec2 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof drones.Vec2
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {drones.Vec2} Vec2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vec2.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Vec2 message.
         * @function verify
         * @memberof drones.Vec2
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Vec2.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            return null;
        };

        /**
         * Creates a Vec2 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof drones.Vec2
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {drones.Vec2} Vec2
         */
        Vec2.fromObject = function fromObject(object) {
            if (object instanceof $root.drones.Vec2)
                return object;
            let message = new $root.drones.Vec2();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            return message;
        };

        /**
         * Creates a plain object from a Vec2 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof drones.Vec2
         * @static
         * @param {drones.Vec2} message Vec2
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Vec2.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            return object;
        };

        /**
         * Converts this Vec2 to JSON.
         * @function toJSON
         * @memberof drones.Vec2
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Vec2.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Vec2;
    })();

    return drones;
})();

export { $root as default };
