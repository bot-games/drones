import * as $protobuf from "protobufjs";
/** Namespace drones. */
export namespace drones {

    /** Properties of an Action. */
    interface IAction {

        /** Action applyForce */
        applyForce?: (drones.IActionApplyForce|null);
    }

    /** Represents an Action. */
    class Action implements IAction {

        /**
         * Constructs a new Action.
         * @param [properties] Properties to set
         */
        constructor(properties?: drones.IAction);

        /** Action applyForce. */
        public applyForce?: (drones.IActionApplyForce|null);

        /** Action action. */
        public action?: "applyForce";

        /**
         * Creates a new Action instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Action instance
         */
        public static create(properties?: drones.IAction): drones.Action;

        /**
         * Encodes the specified Action message. Does not implicitly {@link drones.Action.verify|verify} messages.
         * @param message Action message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drones.IAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Action message, length delimited. Does not implicitly {@link drones.Action.verify|verify} messages.
         * @param message Action message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drones.IAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Action message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drones.Action;

        /**
         * Decodes an Action message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drones.Action;

        /**
         * Verifies an Action message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Action message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Action
         */
        public static fromObject(object: { [k: string]: any }): drones.Action;

        /**
         * Creates a plain object from an Action message. Also converts values to other types if specified.
         * @param message Action
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drones.Action, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Action to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ActionApplyForce. */
    interface IActionApplyForce {

        /** ActionApplyForce x */
        x?: (number|null);

        /** ActionApplyForce y */
        y?: (number|null);

        /** ActionApplyForce torque */
        torque?: (number|null);
    }

    /** Represents an ActionApplyForce. */
    class ActionApplyForce implements IActionApplyForce {

        /**
         * Constructs a new ActionApplyForce.
         * @param [properties] Properties to set
         */
        constructor(properties?: drones.IActionApplyForce);

        /** ActionApplyForce x. */
        public x: number;

        /** ActionApplyForce y. */
        public y: number;

        /** ActionApplyForce torque. */
        public torque: number;

        /**
         * Creates a new ActionApplyForce instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActionApplyForce instance
         */
        public static create(properties?: drones.IActionApplyForce): drones.ActionApplyForce;

        /**
         * Encodes the specified ActionApplyForce message. Does not implicitly {@link drones.ActionApplyForce.verify|verify} messages.
         * @param message ActionApplyForce message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drones.IActionApplyForce, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActionApplyForce message, length delimited. Does not implicitly {@link drones.ActionApplyForce.verify|verify} messages.
         * @param message ActionApplyForce message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drones.IActionApplyForce, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActionApplyForce message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActionApplyForce
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drones.ActionApplyForce;

        /**
         * Decodes an ActionApplyForce message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActionApplyForce
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drones.ActionApplyForce;

        /**
         * Verifies an ActionApplyForce message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActionApplyForce message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActionApplyForce
         */
        public static fromObject(object: { [k: string]: any }): drones.ActionApplyForce;

        /**
         * Creates a plain object from an ActionApplyForce message. Also converts values to other types if specified.
         * @param message ActionApplyForce
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drones.ActionApplyForce, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActionApplyForce to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Options. */
    interface IOptions {

        /** Options maze */
        maze?: (drones.Options.IMaze|null);

        /** Options cellSize */
        cellSize?: (number|null);

        /** Options drone */
        drone?: (drones.Options.IDrone|null);

        /** Options maxTicks */
        maxTicks?: (number|null);
    }

    /** Represents an Options. */
    class Options implements IOptions {

        /**
         * Constructs a new Options.
         * @param [properties] Properties to set
         */
        constructor(properties?: drones.IOptions);

        /** Options maze. */
        public maze?: (drones.Options.IMaze|null);

        /** Options cellSize. */
        public cellSize: number;

        /** Options drone. */
        public drone?: (drones.Options.IDrone|null);

        /** Options maxTicks. */
        public maxTicks: number;

        /**
         * Creates a new Options instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Options instance
         */
        public static create(properties?: drones.IOptions): drones.Options;

        /**
         * Encodes the specified Options message. Does not implicitly {@link drones.Options.verify|verify} messages.
         * @param message Options message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drones.IOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Options message, length delimited. Does not implicitly {@link drones.Options.verify|verify} messages.
         * @param message Options message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drones.IOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Options message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Options
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drones.Options;

        /**
         * Decodes an Options message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Options
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drones.Options;

        /**
         * Verifies an Options message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Options message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Options
         */
        public static fromObject(object: { [k: string]: any }): drones.Options;

        /**
         * Creates a plain object from an Options message. Also converts values to other types if specified.
         * @param message Options
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drones.Options, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Options to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Options {

        /** Properties of a CellPos. */
        interface ICellPos {

            /** CellPos x */
            x?: (number|null);

            /** CellPos y */
            y?: (number|null);
        }

        /** Represents a CellPos. */
        class CellPos implements ICellPos {

            /**
             * Constructs a new CellPos.
             * @param [properties] Properties to set
             */
            constructor(properties?: drones.Options.ICellPos);

            /** CellPos x. */
            public x: number;

            /** CellPos y. */
            public y: number;

            /**
             * Creates a new CellPos instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CellPos instance
             */
            public static create(properties?: drones.Options.ICellPos): drones.Options.CellPos;

            /**
             * Encodes the specified CellPos message. Does not implicitly {@link drones.Options.CellPos.verify|verify} messages.
             * @param message CellPos message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: drones.Options.ICellPos, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CellPos message, length delimited. Does not implicitly {@link drones.Options.CellPos.verify|verify} messages.
             * @param message CellPos message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: drones.Options.ICellPos, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CellPos message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CellPos
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drones.Options.CellPos;

            /**
             * Decodes a CellPos message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CellPos
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drones.Options.CellPos;

            /**
             * Verifies a CellPos message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CellPos message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CellPos
             */
            public static fromObject(object: { [k: string]: any }): drones.Options.CellPos;

            /**
             * Creates a plain object from a CellPos message. Also converts values to other types if specified.
             * @param message CellPos
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: drones.Options.CellPos, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CellPos to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Maze. */
        interface IMaze {

            /** Maze width */
            width?: (number|null);

            /** Maze height */
            height?: (number|null);

            /** Maze walls */
            walls?: (Uint8Array|null);

            /** Maze checkpoints */
            checkpoints?: (drones.Options.ICellPos[]|null);
        }

        /** Represents a Maze. */
        class Maze implements IMaze {

            /**
             * Constructs a new Maze.
             * @param [properties] Properties to set
             */
            constructor(properties?: drones.Options.IMaze);

            /** Maze width. */
            public width: number;

            /** Maze height. */
            public height: number;

            /** Maze walls. */
            public walls: Uint8Array;

            /** Maze checkpoints. */
            public checkpoints: drones.Options.ICellPos[];

            /**
             * Creates a new Maze instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Maze instance
             */
            public static create(properties?: drones.Options.IMaze): drones.Options.Maze;

            /**
             * Encodes the specified Maze message. Does not implicitly {@link drones.Options.Maze.verify|verify} messages.
             * @param message Maze message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: drones.Options.IMaze, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Maze message, length delimited. Does not implicitly {@link drones.Options.Maze.verify|verify} messages.
             * @param message Maze message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: drones.Options.IMaze, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Maze message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Maze
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drones.Options.Maze;

            /**
             * Decodes a Maze message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Maze
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drones.Options.Maze;

            /**
             * Verifies a Maze message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Maze message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Maze
             */
            public static fromObject(object: { [k: string]: any }): drones.Options.Maze;

            /**
             * Creates a plain object from a Maze message. Also converts values to other types if specified.
             * @param message Maze
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: drones.Options.Maze, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Maze to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Drone. */
        interface IDrone {

            /** Drone width */
            width?: (number|null);

            /** Drone height */
            height?: (number|null);

            /** Drone weight */
            weight?: (number|null);

            /** Drone maxForce */
            maxForce?: (number|null);

            /** Drone maxTorque */
            maxTorque?: (number|null);
        }

        /** Represents a Drone. */
        class Drone implements IDrone {

            /**
             * Constructs a new Drone.
             * @param [properties] Properties to set
             */
            constructor(properties?: drones.Options.IDrone);

            /** Drone width. */
            public width: number;

            /** Drone height. */
            public height: number;

            /** Drone weight. */
            public weight: number;

            /** Drone maxForce. */
            public maxForce: number;

            /** Drone maxTorque. */
            public maxTorque: number;

            /**
             * Creates a new Drone instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Drone instance
             */
            public static create(properties?: drones.Options.IDrone): drones.Options.Drone;

            /**
             * Encodes the specified Drone message. Does not implicitly {@link drones.Options.Drone.verify|verify} messages.
             * @param message Drone message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: drones.Options.IDrone, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Drone message, length delimited. Does not implicitly {@link drones.Options.Drone.verify|verify} messages.
             * @param message Drone message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: drones.Options.IDrone, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Drone message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Drone
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drones.Options.Drone;

            /**
             * Decodes a Drone message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Drone
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drones.Options.Drone;

            /**
             * Verifies a Drone message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Drone message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Drone
             */
            public static fromObject(object: { [k: string]: any }): drones.Options.Drone;

            /**
             * Creates a plain object from a Drone message. Also converts values to other types if specified.
             * @param message Drone
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: drones.Options.Drone, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Drone to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a State. */
    interface IState {

        /** State players */
        players?: (drones.IPlayer[]|null);
    }

    /** Represents a State. */
    class State implements IState {

        /**
         * Constructs a new State.
         * @param [properties] Properties to set
         */
        constructor(properties?: drones.IState);

        /** State players. */
        public players: drones.IPlayer[];

        /**
         * Creates a new State instance using the specified properties.
         * @param [properties] Properties to set
         * @returns State instance
         */
        public static create(properties?: drones.IState): drones.State;

        /**
         * Encodes the specified State message. Does not implicitly {@link drones.State.verify|verify} messages.
         * @param message State message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drones.IState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified State message, length delimited. Does not implicitly {@link drones.State.verify|verify} messages.
         * @param message State message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drones.IState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a State message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns State
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drones.State;

        /**
         * Decodes a State message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns State
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drones.State;

        /**
         * Verifies a State message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a State message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns State
         */
        public static fromObject(object: { [k: string]: any }): drones.State;

        /**
         * Creates a plain object from a State message. Also converts values to other types if specified.
         * @param message State
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drones.State, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this State to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Player. */
    interface IPlayer {

        /** Player drone */
        drone?: (drones.IDrone|null);
    }

    /** Represents a Player. */
    class Player implements IPlayer {

        /**
         * Constructs a new Player.
         * @param [properties] Properties to set
         */
        constructor(properties?: drones.IPlayer);

        /** Player drone. */
        public drone?: (drones.IDrone|null);

        /**
         * Creates a new Player instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Player instance
         */
        public static create(properties?: drones.IPlayer): drones.Player;

        /**
         * Encodes the specified Player message. Does not implicitly {@link drones.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drones.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link drones.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drones.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drones.Player;

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drones.Player;

        /**
         * Verifies a Player message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Player
         */
        public static fromObject(object: { [k: string]: any }): drones.Player;

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @param message Player
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drones.Player, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Player to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Drone. */
    interface IDrone {

        /** Drone pos */
        pos?: (drones.IVec2|null);

        /** Drone angle */
        angle?: (number|null);

        /** Drone nextCheckpoint */
        nextCheckpoint?: (number|null);
    }

    /** Represents a Drone. */
    class Drone implements IDrone {

        /**
         * Constructs a new Drone.
         * @param [properties] Properties to set
         */
        constructor(properties?: drones.IDrone);

        /** Drone pos. */
        public pos?: (drones.IVec2|null);

        /** Drone angle. */
        public angle: number;

        /** Drone nextCheckpoint. */
        public nextCheckpoint: number;

        /**
         * Creates a new Drone instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Drone instance
         */
        public static create(properties?: drones.IDrone): drones.Drone;

        /**
         * Encodes the specified Drone message. Does not implicitly {@link drones.Drone.verify|verify} messages.
         * @param message Drone message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drones.IDrone, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Drone message, length delimited. Does not implicitly {@link drones.Drone.verify|verify} messages.
         * @param message Drone message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drones.IDrone, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Drone message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Drone
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drones.Drone;

        /**
         * Decodes a Drone message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Drone
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drones.Drone;

        /**
         * Verifies a Drone message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Drone message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Drone
         */
        public static fromObject(object: { [k: string]: any }): drones.Drone;

        /**
         * Creates a plain object from a Drone message. Also converts values to other types if specified.
         * @param message Drone
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drones.Drone, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Drone to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Vec2. */
    interface IVec2 {

        /** Vec2 x */
        x?: (number|null);

        /** Vec2 y */
        y?: (number|null);
    }

    /** Represents a Vec2. */
    class Vec2 implements IVec2 {

        /**
         * Constructs a new Vec2.
         * @param [properties] Properties to set
         */
        constructor(properties?: drones.IVec2);

        /** Vec2 x. */
        public x: number;

        /** Vec2 y. */
        public y: number;

        /**
         * Creates a new Vec2 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Vec2 instance
         */
        public static create(properties?: drones.IVec2): drones.Vec2;

        /**
         * Encodes the specified Vec2 message. Does not implicitly {@link drones.Vec2.verify|verify} messages.
         * @param message Vec2 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: drones.IVec2, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Vec2 message, length delimited. Does not implicitly {@link drones.Vec2.verify|verify} messages.
         * @param message Vec2 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: drones.IVec2, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Vec2 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Vec2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): drones.Vec2;

        /**
         * Decodes a Vec2 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Vec2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): drones.Vec2;

        /**
         * Verifies a Vec2 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Vec2 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Vec2
         */
        public static fromObject(object: { [k: string]: any }): drones.Vec2;

        /**
         * Creates a plain object from a Vec2 message. Also converts values to other types if specified.
         * @param message Vec2
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: drones.Vec2, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Vec2 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
