SHELL := /bin/bash

ifndef BUILDTYPE
	BUILDTYPE=debug
endif
BASECXXFLAGS = -std=c++20 -Wall -Wextra -Wno-invalid-offsetof -I.
LD_FLAGS = -lssl -lcrypto
DEPDIR := $(BUILDTYPE)/deps
DEPFLAGS = -MT $@ -MMD -MP -MF $(DEPDIR)/$*.d
ifeq ($(BUILDTYPE), release)
	CXXFLAGS=$(BASECXXFLAGS) -Ofast -march=native
else ifeq ($(BUILDTYPE), debug)
	CXXFLAGS=$(BASECXXFLAGS) -O0 -g -DLOCAL -D_GLIBCXX_DEBUG -fsanitize=address -fsanitize=undefined
else ifeq ($(BUILDTYPE), profile)
	CXXFLAGS=$(BASECXXFLAGS) -Og -g -DLOCAL -march=native -pg -fno-inline
else
	$(error Unknown BUILDTYPE)
endif
VPATH = .
ifndef CXX
	CXX = g++
endif
SRC = $(foreach dir,$(VPATH),$(wildcard $(dir)/*.cpp))
HEADERS = $(foreach dir,$(VPATH),$(wildcard $(dir)/*.hpp))
OBJS = $(foreach file,$(SRC),$(BUILDTYPE)/$(subst .cpp,.o,$(file)))
check_main = nm -C $(1) | grep -cE '\smain(\s|$$)' | xargs -i test {} == $(2)
filter_objs_by_main = $(foreach file,$(OBJS),$(shell $(call check_main, $(file), $(1)) && echo $(file)))
BINS = $(foreach file,$(OBJS),$(subst .o,,$(file)))

all: main

$(BUILDTYPE)/%.o: %.cpp $(DEPDIR)/%.d | $(DEPDIR)
	@test -d $$(dirname $@) || mkdir -p $$(dirname $@)
	$(CXX) -c -o $@ $(DEPFLAGS) $(CXXFLAGS) $<

%: %.cpp

$(DEPDIR):
	@mkdir -p $@

.PHONY: all clean % BUILDTYPE

%: $(BUILDTYPE)/./%
	@test -e $<

.SECONDEXPANSION:

all: $(OBJS) $(BINS)

res.zip: $(SRC) $(HEADERS)
	zip res.zip $(SRC) $(HEADERS)

$(BUILDTYPE)/.common_objs: $(OBJS)
	@echo "" > $@
	@for f in $(OBJS); do $(call check_main, $$f, 0) && echo $$f >> $@ || true; done

$(BUILDTYPE)/%: COMMAND = $(CXX) -o $@ $(CXXFLAGS) $< $$(cat $(BUILDTYPE)/.common_objs) $(LD_FLAGS)

$(BUILDTYPE)/%: $(BUILDTYPE)/%.o $(BUILDTYPE)/.common_objs
	@$(call check_main, $<, 0) || (echo $(COMMAND) && $(COMMAND))

clean:
	rm -rf $(BUILDTYPE)

DEPFILES := $(SRC:%.cpp=$(DEPDIR)/%.d)
$(DEPFILES):

include $(wildcard $(DEPFILES))
