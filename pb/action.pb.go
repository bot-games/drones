// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.21.12
// source: drones/action.proto

package pb

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Action struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Action:
	//
	//	*Action_ApplyForce
	Action isAction_Action `protobuf_oneof:"action"`
}

func (x *Action) Reset() {
	*x = Action{}
	if protoimpl.UnsafeEnabled {
		mi := &file_drones_action_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Action) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Action) ProtoMessage() {}

func (x *Action) ProtoReflect() protoreflect.Message {
	mi := &file_drones_action_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Action.ProtoReflect.Descriptor instead.
func (*Action) Descriptor() ([]byte, []int) {
	return file_drones_action_proto_rawDescGZIP(), []int{0}
}

func (m *Action) GetAction() isAction_Action {
	if m != nil {
		return m.Action
	}
	return nil
}

func (x *Action) GetApplyForce() *ActionApplyForce {
	if x, ok := x.GetAction().(*Action_ApplyForce); ok {
		return x.ApplyForce
	}
	return nil
}

type isAction_Action interface {
	isAction_Action()
}

type Action_ApplyForce struct {
	ApplyForce *ActionApplyForce `protobuf:"bytes,1,opt,name=applyForce,proto3,oneof"`
}

func (*Action_ApplyForce) isAction_Action() {}

type ActionApplyForce struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	X      float32 `protobuf:"fixed32,1,opt,name=x,proto3" json:"x,omitempty"`
	Y      float32 `protobuf:"fixed32,2,opt,name=y,proto3" json:"y,omitempty"`
	Torque float32 `protobuf:"fixed32,3,opt,name=torque,proto3" json:"torque,omitempty"`
}

func (x *ActionApplyForce) Reset() {
	*x = ActionApplyForce{}
	if protoimpl.UnsafeEnabled {
		mi := &file_drones_action_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ActionApplyForce) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ActionApplyForce) ProtoMessage() {}

func (x *ActionApplyForce) ProtoReflect() protoreflect.Message {
	mi := &file_drones_action_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ActionApplyForce.ProtoReflect.Descriptor instead.
func (*ActionApplyForce) Descriptor() ([]byte, []int) {
	return file_drones_action_proto_rawDescGZIP(), []int{1}
}

func (x *ActionApplyForce) GetX() float32 {
	if x != nil {
		return x.X
	}
	return 0
}

func (x *ActionApplyForce) GetY() float32 {
	if x != nil {
		return x.Y
	}
	return 0
}

func (x *ActionApplyForce) GetTorque() float32 {
	if x != nil {
		return x.Torque
	}
	return 0
}

var File_drones_action_proto protoreflect.FileDescriptor

var file_drones_action_proto_rawDesc = []byte{
	0x0a, 0x13, 0x64, 0x72, 0x6f, 0x6e, 0x65, 0x73, 0x2f, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06, 0x64, 0x72, 0x6f, 0x6e, 0x65, 0x73, 0x22, 0x4e, 0x0a,
	0x06, 0x41, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x3a, 0x0a, 0x0a, 0x61, 0x70, 0x70, 0x6c, 0x79,
	0x46, 0x6f, 0x72, 0x63, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x18, 0x2e, 0x64, 0x72,
	0x6f, 0x6e, 0x65, 0x73, 0x2e, 0x41, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x41, 0x70, 0x70, 0x6c, 0x79,
	0x46, 0x6f, 0x72, 0x63, 0x65, 0x48, 0x00, 0x52, 0x0a, 0x61, 0x70, 0x70, 0x6c, 0x79, 0x46, 0x6f,
	0x72, 0x63, 0x65, 0x42, 0x08, 0x0a, 0x06, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x22, 0x46, 0x0a,
	0x10, 0x41, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x41, 0x70, 0x70, 0x6c, 0x79, 0x46, 0x6f, 0x72, 0x63,
	0x65, 0x12, 0x0c, 0x0a, 0x01, 0x78, 0x18, 0x01, 0x20, 0x01, 0x28, 0x02, 0x52, 0x01, 0x78, 0x12,
	0x0c, 0x0a, 0x01, 0x79, 0x18, 0x02, 0x20, 0x01, 0x28, 0x02, 0x52, 0x01, 0x79, 0x12, 0x16, 0x0a,
	0x06, 0x74, 0x6f, 0x72, 0x71, 0x75, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x02, 0x52, 0x06, 0x74,
	0x6f, 0x72, 0x71, 0x75, 0x65, 0x42, 0x05, 0x5a, 0x03, 0x2f, 0x70, 0x62, 0x62, 0x06, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_drones_action_proto_rawDescOnce sync.Once
	file_drones_action_proto_rawDescData = file_drones_action_proto_rawDesc
)

func file_drones_action_proto_rawDescGZIP() []byte {
	file_drones_action_proto_rawDescOnce.Do(func() {
		file_drones_action_proto_rawDescData = protoimpl.X.CompressGZIP(file_drones_action_proto_rawDescData)
	})
	return file_drones_action_proto_rawDescData
}

var file_drones_action_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_drones_action_proto_goTypes = []interface{}{
	(*Action)(nil),           // 0: drones.Action
	(*ActionApplyForce)(nil), // 1: drones.ActionApplyForce
}
var file_drones_action_proto_depIdxs = []int32{
	1, // 0: drones.Action.applyForce:type_name -> drones.ActionApplyForce
	1, // [1:1] is the sub-list for method output_type
	1, // [1:1] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_drones_action_proto_init() }
func file_drones_action_proto_init() {
	if File_drones_action_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_drones_action_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Action); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_drones_action_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ActionApplyForce); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_drones_action_proto_msgTypes[0].OneofWrappers = []interface{}{
		(*Action_ApplyForce)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_drones_action_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_drones_action_proto_goTypes,
		DependencyIndexes: file_drones_action_proto_depIdxs,
		MessageInfos:      file_drones_action_proto_msgTypes,
	}.Build()
	File_drones_action_proto = out.File
	file_drones_action_proto_rawDesc = nil
	file_drones_action_proto_goTypes = nil
	file_drones_action_proto_depIdxs = nil
}
